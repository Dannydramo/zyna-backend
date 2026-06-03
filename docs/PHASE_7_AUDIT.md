# Phase 7 Email Audit — Scope for Phase 7.5 Hardening

## Current State (Phase 7)

### Endpoints Implemented
- `POST /ingestion/email/webhook` — inbound webhook, takes provider payload
- `POST /ingestion/email/send` — outbound send via nodemailer

### Inbound Ingestion (`ingestEmail`)
✅ **Good:**
- Handles duplicate detection by `externalMessageId`
- Upserts `Customer` by email
- Matches inbound to existing `Conversation` by `externalThreadId` (email's thread ID from provider)
- Creates new `Conversation` + `Ticket` if no match
- Fires `message.inbound` event (triggers AI pipeline in Phase 4)
- Writes audit record

❌ **Single-tenant assumptions:**
- **No org context for the receiving address:** endpoint assumes all inbound belongs to the org in the request header. If provider sends webhook without org context, we can't route correctly.
- **No ChannelConnection lookup:** doesn't verify that the receiving domain/address is configured and active in the org's `ChannelConnection`.
- **No per-org receiving identity:** the logic doesn't care which domain/address received the email — it just accepts it.

### Outbound Send (`sendEmail`)
❌ **Critical single-tenant issues:**
- **Hardcoded SMTP config in .env:** all orgs share one `SMTP_HOST`, `SMTP_FROM`, etc. Business A and Business B both send from the same domain.
- **No per-org identity:** the `from` address is set globally (`SMTP_FROM` env var), not by org's `ChannelConnection`.
- **No ChannelConnection active check:** doesn't verify the org has an `ACTIVE` email connection before sending.
- **No provider message ID tracking:** the `sendEmail` method doesn't persist `providerMessageId` on the `Message` record.

### IMAP Polling (`pollImap`)
⚠️ **Incomplete:**
- Connects to a single IMAP account (from env: `IMAP_HOST`, `IMAP_USER`, `IMAP_PASS`).
- Only logs "TODO" — doesn't parse or ingest messages.
- No per-org IMAP account support.

### Database
- ✅ `Message` has `externalMessageId` and `headers` (JSON) for threading
- ✅ `Conversation` has `externalThreadId`
- ❌ `Message` lacks `providerMessageId` and `deliveryStatus` (added in schema migration 20260529032425)
- ❌ No `ChannelConnection` entity (added in schema migration 20260529032425)

---

## What Needs to Change for Phase 7.5

### 1. **Inbound Webhook Routing**
- Provider sends inbound to a webhook route (remains `POST /ingest/email`).
- **New:** Extract the recipient domain/address from the provider payload.
- **New:** Look up the org via `ChannelConnection.config.inboundRoutingAddress` that matches the recipient.
- **Change:** Don't rely on `x-org-id` header — derive org from the email provider's routing.
- **Benefit:** provider can route to a single generic webhook URL; platform routes to the correct org.

### 2. **ChannelConnection Model**
- Added in schema migration `20260529032425`.
- `ChannelConnection.config` will store per-org email identity:
  ```json
  {
    "domain": "support.example.com",
    "fromAddress": "support@example.com",
    "fromName": "Example Support",
    "providerDomainId": "sendgrid-domain-id-xyz",
    "dnsRecords": [
      { "host": "_sendgrid.example.com", "type": "CNAME", "expectedValue": "sendgrid.net.", "status": "pending" }
    ],
    "inboundRoutingAddress": "support@example.com"
  }
  ```

### 3. **ChannelDispatcher Pattern**
- **New module:** `modules/channels/dispatcher/`.
- Central abstraction: `ChannelDispatcher.send(ticket, message)` looks up the org's `ChannelConnection[EMAIL]`, checks status = `ACTIVE`, calls `EmailSender.send()`.
- If not `ACTIVE`, throw `ChannelNotActiveError` (UI shows "Email channel not yet verified").
- **Change:** Move the `sendEmail` call in `TicketsModule` and AI modules behind the dispatcher.

### 4. **Email-Specific Sender**
- **New module:** `modules/channels/email/`.
- **New service:** `EmailSender` implements `ChannelSender` interface.
  ```ts
  send(input: {
    org: OrgChannelConfig,       // from ChannelConnection.config
    to: string,
    conversation: Conversation,
    message: Message
  }): Promise<{ providerMessageId; status }>
  ```
- Uses the org's `fromAddress` + `fromName` from `ChannelConnection.config`.
- Reads provider credentials from `.env` (shared across orgs) or from encrypted secrets table (future).
- Sets email threading headers (`In-Reply-To`, `References`, consistent `Message-ID`).
- Stores `providerMessageId` on `Message.providerMessageId`.
- Listens for provider webhooks → updates `Message.deliveryStatus`.

### 5. **DNS Verification**
- **New service:** `EmailVerificationService` in `modules/channels/email/`.
- `POST /channels/email` — user submits domain + from address.
  - Calls provider's domain-auth API → returns a set of DNS records.
  - Persist on `ChannelConnection.config.dnsRecords[].status = 'pending'`.
  - Overall `ChannelConnection.status = PENDING`.
- `POST /channels/email/verify` — user clicks "Verify".
  - Calls provider's verify endpoint (which does a live DNS lookup).
  - Update each `dnsRecords[].status` (`verified` / `failed`).
  - If all verified → `ChannelConnection.status = ACTIVE`, set `verifiedAt`.

### 6. **Refactor Existing `ingestion.service.ts`**
- Move email-specific logic to `modules/channels/email/email-ingestion.controller.ts`.
- Keep the `message.inbound` event emit (unchanged; Phase 4 AI pipeline still listens).
- **Change:** inbound webhook now looks up org via `ChannelConnection` lookup, not header.

---

## Migration Path

### For Dev (existing seeded data)
- Create a seed script or manual SQL that creates a `ChannelConnection` for `org_acme`:
  ```sql
  INSERT INTO "ChannelConnection" 
    (id, "organizationId", channel, status, config, "verifiedAt", "createdAt", "updatedAt")
  VALUES (
    'conn_email_dev',
    'org_acme',
    'EMAIL',
    'ACTIVE',
    '{"domain":"localhost:4000","fromAddress":"dev@localhost","fromName":"Dev Support","inboundRoutingAddress":"dev@localhost"}',
    NOW(),
    NOW(),
    NOW()
  );
  ```
- This allows existing seeded tickets to continue working without re-wiring.

### For Production
- Admins connect their own domain + credentials via the dashboard → `ChannelConnection` created with status = `PENDING`.
- They add DNS records to their domain.
- They click "Verify" → live DNS check → status → `ACTIVE`.

---

## File Structure After Phase 7.5

```
modules/
  channels/
    channel-connections/
      channel-connections.module.ts
      channel-connections.controller.ts
      channel-connections.service.ts
      dto/
        list-connections.dto.ts
        get-connection.dto.ts
    dispatcher/
      channel-dispatcher.module.ts
      channel-dispatcher.service.ts
      channel-sender.interface.ts
      exceptions/
        channel-not-active.exception.ts
    email/
      email.module.ts
      email-sender.service.ts
      email-ingestion.controller.ts
      email-verification.service.ts
      dto/
        create-email-connection.dto.ts
        verify-email-connection.dto.ts
  ingestion/                         # Phase 7 code — DEPRECATED after Phase 7.5
    (remains for backward compat; routes to channels/email)
  tickets/
  conversations/
  customers/
  ai/
  knowledge/
  users/
  auth/
  sla/
  analytics/
```

---

## Scope for Phase 7.5 Build

1. **ChannelConnectionsModule** — generic CRUD for all channels.
2. **EmailModule** — email-specific sender + verifier + ingestion.
3. **ChannelDispatcher** — central abstraction.
4. **Refactor TicketsModule** — wire reply sends through dispatcher.
5. **Refactor AI module** — wire accept sends through dispatcher.
6. **Seed/migrate** — create dev `ChannelConnection` for testing.
7. **End-to-end test** — verify email round trip works end-to-end with SPF/DKIM passing.

---

## Gate Criteria (Phase 7.5 Done)

✅ Email round trip works: inbound webhook → ticket → AI → reply → outbound via org's configured domain.  
✅ ChannelConnection active check prevents sends on inactive connections.  
✅ DNS verification flows end-to-end.  
✅ No single-tenant assumptions remain (every org has isolated channel identity).  
✅ `providerMessageId` + `deliveryStatus` tracked on messages.  
✅ Audit records written for every channel connection change + send.  
