import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ImapFlow } from 'imapflow';
import * as nodemailer from 'nodemailer';
import {
  AuditActorType,
  Channel,
  MessageAuthorType,
  MessageDirection,
  TicketPriority,
} from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import type { InboundEmailDto } from './dto/inbound-email.dto';
import type { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly events: EventEmitter2,
  ) {}

  async ingestEmail(orgId: string, dto: InboundEmailDto) {
    const duplicate = dto.messageId
      ? await this.prisma.message.findFirst({
          where: { organizationId: orgId, externalMessageId: dto.messageId },
        })
      : null;
    if (duplicate)
      return { data: { duplicate: true, messageId: duplicate.id } };

    const customer = await this.prisma.customer.upsert({
      where: {
        organizationId_email: { organizationId: orgId, email: dto.fromEmail },
      },
      create: {
        organizationId: orgId,
        name: dto.fromName ?? dto.fromEmail.split('@')[0],
        email: dto.fromEmail,
      },
      update: {
        ...(dto.fromName && { name: dto.fromName }),
      },
    });

    const existingConversation = dto.threadId
      ? await this.prisma.conversation.findFirst({
          where: { organizationId: orgId, externalThreadId: dto.threadId },
          include: { ticket: true },
        })
      : null;

    if (existingConversation?.ticket) {
      this.logger.log(
        `✅ [EMAIL THREADING] Found existing conversation for threadId: ${dto.threadId}`,
      );
      this.logger.log(
        `   Ticket ID: ${existingConversation.ticket.id}, Customer: ${customer.email}`,
      );

      const message = await this.createInboundMessage(
        orgId,
        existingConversation.id,
        customer.id,
        dto.body,
        dto.messageId,
        { source: 'email_webhook', threadId: dto.threadId },
      );
      this.events.emit('message.inbound', {
        organizationId: orgId,
        ticketId: existingConversation.ticket.id,
        messageId: message.id,
      });
      return { data: { ticket: existingConversation.ticket, message } };
    }

    // No existing conversation found, creating new ticket
    if (dto.threadId) {
      this.logger.log(
        `📭 [NEW TICKET] No existing conversation found for threadId: ${dto.threadId}`,
      );
    } else {
      this.logger.log(`📭 [NEW TICKET] Creating new ticket (no threadId provided)`);
    }

    const conversation = await this.prisma.conversation.create({
      data: {
        organizationId: orgId,
        customerId: customer.id,
        channel: Channel.EMAIL,
        externalThreadId: dto.threadId,
      },
    });
    const message = await this.createInboundMessage(
      orgId,
      conversation.id,
      customer.id,
      dto.body,
      dto.messageId,
      { source: 'email_webhook', threadId: dto.threadId },
    );
    const ticket = await this.prisma.ticket.create({
      data: {
        organizationId: orgId,
        conversationId: conversation.id,
        customerId: customer.id,
        subject: dto.subject,
        channel: Channel.EMAIL,
        priority: TicketPriority.NORMAL,
        tags: ['email'],
      },
      include: { customer: true },
    });

    await this.prisma.auditRecord.create({
      data: {
        organizationId: orgId,
        actorType: AuditActorType.SYSTEM,
        action: 'INGEST_EMAIL',
        entityType: 'Ticket',
        entityId: ticket.id,
        metadata: { messageId: dto.messageId, threadId: dto.threadId },
      },
    });
    this.events.emit('message.inbound', {
      organizationId: orgId,
      ticketId: ticket.id,
      messageId: message.id,
    });
    return { data: { ticket, message } };
  }

  async sendEmail(dto: SendEmailDto) {
    // Use dynamic SMTP config if provided, otherwise fall back to env vars
    const smtpConfig = dto.smtpConfig || {
      host: this.config.get<string>('SMTP_HOST'),
      port: Number(this.config.get<string>('SMTP_PORT') ?? 587),
      secure: this.config.get<string>('SMTP_SECURE') === 'true',
      user: this.config.get<string>('SMTP_USER'),
      pass: this.config.get<string>('SMTP_PASS'),
    };

    if (!smtpConfig.host) {
      this.logger.error('❌ [SMTP_CONFIG] No SMTP host configured');
      return {
        data: { queued: false, message: 'SMTP host is not configured' },
      };
    }

    this.logger.log(`[SMTP_TRANSPORT] Creating transport with host: ${smtpConfig.host}:${smtpConfig.port}`);

    const transport = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: smtpConfig.user && smtpConfig.pass
        ? {
            user: smtpConfig.user,
            pass: smtpConfig.pass,
          }
        : undefined,
    });

    const fromAddress = dto.from ?? this.config.get<string>('SMTP_FROM') ?? 'support@example.com';
    this.logger.log(`📤 [SEND_EMAIL] From: ${fromAddress}, To: ${dto.to}, Subject: ${dto.subject}`);

    try {
      const info = await transport.sendMail({
        from: fromAddress,
        to: dto.to,
        subject: dto.subject,
        text: dto.body,
        inReplyTo: dto.inReplyTo,
      });
      this.logger.log(`✅ [EMAIL_QUEUED] Message ID: ${info.messageId}`);
      return { data: { queued: true, messageId: info.messageId } };
    } catch (err) {
      this.logger.error(`❌ [SMTP_ERROR] Failed to send email: ${err instanceof Error ? err.message : String(err)}`);
      throw err;
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async pollImap() {
    const imapEnabled = this.config.get<string>('IMAP_ENABLED');
    this.logger.log(`⏰ [CRON] pollImap() executed at ${new Date().toISOString()}`);

    if (imapEnabled !== 'true') {
      this.logger.warn(`⚠️  [IMAP POLL] IMAP_ENABLED=${imapEnabled} (not 'true'), skipping...`);
      return;
    }

    this.logger.log(`📧 [IMAP POLL] Starting per-org email polling...`);

    // Load all EMAIL channel connections with IMAP enabled
    const connections = await this.prisma.channelConnection.findMany({
      where: { channel: Channel.EMAIL, status: 'ACTIVE' },
    });

    const imapConnections = connections.filter(
      (c) => (c.config as any).imapEnabled === true,
    );

    if (imapConnections.length === 0) {
      this.logger.log(`📧 [IMAP POLL] No orgs have IMAP configured`);
      return;
    }

    this.logger.log(`📧 [IMAP POLL] Polling ${imapConnections.length} org inbox(es)...`);

    for (const connection of imapConnections) {
      await this.pollOrgInbox(connection);
    }

    this.logger.log(`✅ [IMAP POLL] All orgs checked\n`);
  }

  private async pollOrgInbox(connection: any) {
    const cfg = connection.config as Record<string, any>;
    const orgId = connection.organizationId;

    const imapHost = cfg.imapHost as string;
    const imapPort = cfg.imapPort ?? 993;
    const imapSecure = cfg.imapSecure ?? true;
    const imapUser = cfg.imapUser as string;
    const imapPass = cfg.imapPass as string;

    if (!imapHost || !imapUser || !imapPass) {
      return;
    }

    const client = new ImapFlow({
      host: imapHost,
      port: imapPort,
      secure: imapSecure,
      auth: { user: imapUser, pass: imapPass },
    });

    try {
      await client.connect();
      await client.mailboxOpen('INBOX');

      // Search for unread messages
      const unreadUIDs = await client.search({ seen: false });
      const messageUIDs = unreadUIDs && Array.isArray(unreadUIDs) ? unreadUIDs : [];

      this.logger.log(`📬 [${orgId}] Found ${messageUIDs.length} unread emails`);

      if (messageUIDs.length === 0) {
        await client.logout();
        return;
      }

      let processedCount = 0;
      let msgIndex = 0;
      let loopStarted = false;

      this.logger.log(`[FETCH_START] Fetching ${messageUIDs.length} messages...`);

      try {
        for await (const message of client.fetch(messageUIDs, {
          envelope: true,
          source: true,
        })) {
          loopStarted = true;
          msgIndex++;
          this.logger.log(`[FETCH_ITEM] Got message ${msgIndex}/${messageUIDs.length}`);

          try {
            // Skip already-read messages
            if (message.flags?.has('\\Seen')) {
              this.logger.log(`[SKIP] Message already read`);
              continue;
            }

            const envelope = message.envelope as any;
            if (!envelope) {
              this.logger.log(`[SKIP] No envelope`);
              continue;
            }

            const fromEmail = envelope.from?.[0]?.address || 'unknown@example.com';
            const fromName = envelope.from?.[0]?.name || fromEmail;
            const subject = envelope.subject || '(no subject)';
            const messageId = envelope.messageId || undefined;
            const inReplyTo = envelope.inReplyTo || undefined;
            const references = envelope.references || undefined;

            // Extract body from raw source
            let body = '';
            const source = (message as any).source;
            this.logger.log(
              `[SOURCE] Type: ${typeof source}, isBuffer: ${Buffer.isBuffer(source)}, isNull: ${source === null}`,
            );

            if (source) {
              // source is a Buffer object, convert to string
              let sourceStr = '';
              try {
                if (Buffer.isBuffer(source)) {
                  sourceStr = source.toString('utf-8');
                } else if (typeof source === 'string') {
                  sourceStr = source;
                } else {
                  sourceStr = String(source);
                }

                // Parse MIME to extract clean text body
                // First, split headers from body
                const headerEndIdx = sourceStr.search(/\r?\n\r?\n/);
                let bodyContent = headerEndIdx > -1 ? sourceStr.substring(headerEndIdx + (sourceStr[headerEndIdx] === '\r' ? 4 : 2)) : sourceStr;

                // Check for multipart MIME
                const boundaryMatch = sourceStr.match(/boundary="?([^"\r\n;]+)"?/i);
                if (boundaryMatch) {
                  const boundary = boundaryMatch[1];
                  const escapedBoundary = boundary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                  // Extract text/plain part
                  const textPlainRegex = new RegExp(
                    `--${escapedBoundary}[^\\r\\n]*\\r?\\n(?:[^\\r\\n]*\\r?\\n)*?Content-Type:\\s*text/plain[^\\r\\n]*\\r?\\n(?:[^\\r\\n]*\\r?\\n)*?\\r?\\n([\\s\\S]*?)\\r?\\n--${escapedBoundary}`,
                    'i'
                  );
                  const match = bodyContent.match(textPlainRegex);
                  if (match) {
                    body = match[1].trim();
                  } else {
                    // Fallback: get first part after boundary
                    const firstPartRegex = /--[^\r\n]+\r?\n[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n--|\r?\n$)/;
                    const fallback = bodyContent.match(firstPartRegex);
                    body = fallback ? fallback[1].trim() : bodyContent.trim();
                  }
                } else {
                  // Not multipart, use body content as-is
                  body = bodyContent.trim();
                }

                if (body && body.length > 0) {
                  this.logger.log(`[BODY_FOUND] Length: ${body.length}`);
                } else {
                  this.logger.log(
                    `[BODY_EMPTY] Source first 200: ${sourceStr.substring(0, 200)}`,
                  );
                }
              } catch (srcErr) {
                this.logger.error(`[SOURCE_ERROR] ${srcErr instanceof Error ? srcErr.message : String(srcErr)}`);
              }
            } else {
              this.logger.log(`[SOURCE_NULL] Source is null/undefined`);
            }

            if (!body) body = '(no message body)';

            this.logger.log(
              `📧 [${orgId}] (${msgIndex}/${messageUIDs.length}) ${fromName} <${fromEmail}>`,
            );
            this.logger.log(`   Subject: ${subject}`);
            this.logger.log(`   Body: ${body.substring(0, 300)}${body.length > 300 ? '...' : ''}`);

            // Use In-Reply-To header to link to existing conversation
            // If it's a reply, inReplyTo will contain the original email's Message-ID
            const threadId = inReplyTo || messageId;

            if (inReplyTo) {
              this.logger.log(`🔗 [THREAD] In-Reply-To detected: ${inReplyTo}`);
            }

            await this.ingestEmail(orgId, {
              fromEmail,
              fromName,
              toAddress: cfg.inboundRoutingAddress,
              subject,
              body,
              messageId,
              threadId,
            });

            processedCount++;
            this.logger.log(`[INGESTED] Message ${msgIndex} processed`);

            // Mark as read
            this.logger.log(`[PRE_FLAG] About to mark message ${msgIndex} as read, uid=${message.uid}`);
            if (message.uid) {
              try {
                // Set a timeout for the flag operation to prevent hanging
                const flagPromise = client.messageFlagsAdd(message.uid, ['\\Seen'], { uid: true });
                const timeoutPromise = new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Flag operation timeout after 5s')), 5000)
                );
                await Promise.race([flagPromise, timeoutPromise]);
                this.logger.log(`[MARKED_READ] Message ${msgIndex}`);
              } catch (flagErr) {
                this.logger.error(`[FLAG_ERROR] Failed to mark message ${msgIndex} as read: ${flagErr instanceof Error ? flagErr.message : String(flagErr)}`);
              }
            }
            this.logger.log(`[AFTER_FLAG] Message ${msgIndex} flag operation complete`);
          } catch (err) {
            this.logger.error(
              `[ERROR] Message ${msgIndex}: ${err instanceof Error ? err.message : String(err)}`,
            );
          }

          this.logger.log(`[LOOP_END] Message ${msgIndex} done, waiting for next...`);
        }
      } catch (iterErr) {
        this.logger.error(
          `[ITER_ERROR] Async iterator error: ${iterErr instanceof Error ? iterErr.message : String(iterErr)}`,
        );
      }

      this.logger.log(
        `[FETCH_COMPLETE] Async loop exited. Fetched: ${msgIndex}/${messageUIDs.length}, Processed: ${processedCount}`,
      );

      if (!loopStarted) {
        this.logger.log(`[FETCH_FAILED] Loop never started for ${messageUIDs.length} messages`);
      }

      this.logger.log(`✅ [${orgId}] Processed ${processedCount}/${messageUIDs.length} emails\n`);
    } catch (err) {
      this.logger.error(
        `[${orgId}] Error: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      await client.logout().catch(() => undefined);
    }
  }

  private createInboundMessage(
    orgId: string,
    conversationId: string,
    customerId: string,
    body: string,
    externalMessageId?: string,
    headers: Record<string, unknown> = {},
  ) {
    return this.prisma.message.create({
      data: {
        organizationId: orgId,
        conversationId,
        direction: MessageDirection.INBOUND,
        body,
        authorType: MessageAuthorType.CUSTOMER,
        authorId: customerId,
        externalMessageId,
        headers: headers as unknown as Parameters<
          typeof this.prisma.message.create
        >[0]['data']['headers'],
      },
    });
  }
}
