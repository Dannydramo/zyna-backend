"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var IngestionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const imapflow_1 = require("imapflow");
const nodemailer = __importStar(require("nodemailer"));
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../../prisma/prisma.service");
let IngestionService = IngestionService_1 = class IngestionService {
    constructor(prisma, config, events) {
        this.prisma = prisma;
        this.config = config;
        this.events = events;
        this.logger = new common_1.Logger(IngestionService_1.name);
    }
    async ingestEmail(orgId, dto) {
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
            this.logger.log(`✅ [EMAIL THREADING] Found existing conversation for threadId: ${dto.threadId}`);
            this.logger.log(`   Ticket ID: ${existingConversation.ticket.id}, Customer: ${customer.email}`);
            const message = await this.createInboundMessage(orgId, existingConversation.id, customer.id, dto.body, dto.messageId, { source: 'email_webhook', threadId: dto.threadId });
            this.events.emit('message.inbound', {
                organizationId: orgId,
                ticketId: existingConversation.ticket.id,
                messageId: message.id,
            });
            return { data: { ticket: existingConversation.ticket, message } };
        }
        if (dto.threadId) {
            this.logger.log(`📭 [NEW TICKET] No existing conversation found for threadId: ${dto.threadId}`);
        }
        else {
            this.logger.log(`📭 [NEW TICKET] Creating new ticket (no threadId provided)`);
        }
        const conversation = await this.prisma.conversation.create({
            data: {
                organizationId: orgId,
                customerId: customer.id,
                channel: enums_1.Channel.EMAIL,
                externalThreadId: dto.threadId,
            },
        });
        const message = await this.createInboundMessage(orgId, conversation.id, customer.id, dto.body, dto.messageId, { source: 'email_webhook', threadId: dto.threadId });
        const ticket = await this.prisma.ticket.create({
            data: {
                organizationId: orgId,
                conversationId: conversation.id,
                customerId: customer.id,
                subject: dto.subject,
                channel: enums_1.Channel.EMAIL,
                priority: enums_1.TicketPriority.NORMAL,
                tags: ['email'],
            },
            include: { customer: true },
        });
        await this.prisma.auditRecord.create({
            data: {
                organizationId: orgId,
                actorType: enums_1.AuditActorType.SYSTEM,
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
    async sendEmail(dto) {
        const smtpConfig = dto.smtpConfig || {
            host: this.config.get('SMTP_HOST'),
            port: Number(this.config.get('SMTP_PORT') ?? 587),
            secure: this.config.get('SMTP_SECURE') === 'true',
            user: this.config.get('SMTP_USER'),
            pass: this.config.get('SMTP_PASS'),
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
        const fromAddress = dto.from ?? this.config.get('SMTP_FROM') ?? 'support@example.com';
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
        }
        catch (err) {
            this.logger.error(`❌ [SMTP_ERROR] Failed to send email: ${err instanceof Error ? err.message : String(err)}`);
            throw err;
        }
    }
    async pollImap() {
        const imapEnabled = this.config.get('IMAP_ENABLED');
        this.logger.log(`⏰ [CRON] pollImap() executed at ${new Date().toISOString()}`);
        if (imapEnabled !== 'true') {
            this.logger.warn(`⚠️  [IMAP POLL] IMAP_ENABLED=${imapEnabled} (not 'true'), skipping...`);
            return;
        }
        this.logger.log(`📧 [IMAP POLL] Starting per-org email polling...`);
        const connections = await this.prisma.channelConnection.findMany({
            where: { channel: enums_1.Channel.EMAIL, status: 'ACTIVE' },
        });
        const imapConnections = connections.filter((c) => c.config.imapEnabled === true);
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
    async pollOrgInbox(connection) {
        const cfg = connection.config;
        const orgId = connection.organizationId;
        const imapHost = cfg.imapHost;
        const imapPort = cfg.imapPort ?? 993;
        const imapSecure = cfg.imapSecure ?? true;
        const imapUser = cfg.imapUser;
        const imapPass = cfg.imapPass;
        if (!imapHost || !imapUser || !imapPass) {
            return;
        }
        const client = new imapflow_1.ImapFlow({
            host: imapHost,
            port: imapPort,
            secure: imapSecure,
            auth: { user: imapUser, pass: imapPass },
        });
        try {
            await client.connect();
            await client.mailboxOpen('INBOX');
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
                        if (message.flags?.has('\\Seen')) {
                            this.logger.log(`[SKIP] Message already read`);
                            continue;
                        }
                        const envelope = message.envelope;
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
                        let body = '';
                        const source = message.source;
                        this.logger.log(`[SOURCE] Type: ${typeof source}, isBuffer: ${Buffer.isBuffer(source)}, isNull: ${source === null}`);
                        if (source) {
                            let sourceStr = '';
                            try {
                                if (Buffer.isBuffer(source)) {
                                    sourceStr = source.toString('utf-8');
                                }
                                else if (typeof source === 'string') {
                                    sourceStr = source;
                                }
                                else {
                                    sourceStr = String(source);
                                }
                                const headerEndIdx = sourceStr.search(/\r?\n\r?\n/);
                                let bodyContent = headerEndIdx > -1 ? sourceStr.substring(headerEndIdx + (sourceStr[headerEndIdx] === '\r' ? 4 : 2)) : sourceStr;
                                const boundaryMatch = sourceStr.match(/boundary="?([^"\r\n;]+)"?/i);
                                if (boundaryMatch) {
                                    const boundary = boundaryMatch[1];
                                    const escapedBoundary = boundary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                                    const textPlainRegex = new RegExp(`--${escapedBoundary}[^\\r\\n]*\\r?\\n(?:[^\\r\\n]*\\r?\\n)*?Content-Type:\\s*text/plain[^\\r\\n]*\\r?\\n(?:[^\\r\\n]*\\r?\\n)*?\\r?\\n([\\s\\S]*?)\\r?\\n--${escapedBoundary}`, 'i');
                                    const match = bodyContent.match(textPlainRegex);
                                    if (match) {
                                        body = match[1].trim();
                                    }
                                    else {
                                        const firstPartRegex = /--[^\r\n]+\r?\n[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n--|\r?\n$)/;
                                        const fallback = bodyContent.match(firstPartRegex);
                                        body = fallback ? fallback[1].trim() : bodyContent.trim();
                                    }
                                }
                                else {
                                    body = bodyContent.trim();
                                }
                                if (body && body.length > 0) {
                                    this.logger.log(`[BODY_FOUND] Length: ${body.length}`);
                                }
                                else {
                                    this.logger.log(`[BODY_EMPTY] Source first 200: ${sourceStr.substring(0, 200)}`);
                                }
                            }
                            catch (srcErr) {
                                this.logger.error(`[SOURCE_ERROR] ${srcErr instanceof Error ? srcErr.message : String(srcErr)}`);
                            }
                        }
                        else {
                            this.logger.log(`[SOURCE_NULL] Source is null/undefined`);
                        }
                        if (!body)
                            body = '(no message body)';
                        this.logger.log(`📧 [${orgId}] (${msgIndex}/${messageUIDs.length}) ${fromName} <${fromEmail}>`);
                        this.logger.log(`   Subject: ${subject}`);
                        this.logger.log(`   Body: ${body.substring(0, 300)}${body.length > 300 ? '...' : ''}`);
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
                        this.logger.log(`[PRE_FLAG] About to mark message ${msgIndex} as read, uid=${message.uid}`);
                        if (message.uid) {
                            try {
                                const flagPromise = client.messageFlagsAdd(message.uid, ['\\Seen'], { uid: true });
                                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Flag operation timeout after 5s')), 5000));
                                await Promise.race([flagPromise, timeoutPromise]);
                                this.logger.log(`[MARKED_READ] Message ${msgIndex}`);
                            }
                            catch (flagErr) {
                                this.logger.error(`[FLAG_ERROR] Failed to mark message ${msgIndex} as read: ${flagErr instanceof Error ? flagErr.message : String(flagErr)}`);
                            }
                        }
                        this.logger.log(`[AFTER_FLAG] Message ${msgIndex} flag operation complete`);
                    }
                    catch (err) {
                        this.logger.error(`[ERROR] Message ${msgIndex}: ${err instanceof Error ? err.message : String(err)}`);
                    }
                    this.logger.log(`[LOOP_END] Message ${msgIndex} done, waiting for next...`);
                }
            }
            catch (iterErr) {
                this.logger.error(`[ITER_ERROR] Async iterator error: ${iterErr instanceof Error ? iterErr.message : String(iterErr)}`);
            }
            this.logger.log(`[FETCH_COMPLETE] Async loop exited. Fetched: ${msgIndex}/${messageUIDs.length}, Processed: ${processedCount}`);
            if (!loopStarted) {
                this.logger.log(`[FETCH_FAILED] Loop never started for ${messageUIDs.length} messages`);
            }
            this.logger.log(`✅ [${orgId}] Processed ${processedCount}/${messageUIDs.length} emails\n`);
        }
        catch (err) {
            this.logger.error(`[${orgId}] Error: ${err instanceof Error ? err.message : String(err)}`);
        }
        finally {
            await client.logout().catch(() => undefined);
        }
    }
    createInboundMessage(orgId, conversationId, customerId, body, externalMessageId, headers = {}) {
        return this.prisma.message.create({
            data: {
                organizationId: orgId,
                conversationId,
                direction: enums_1.MessageDirection.INBOUND,
                body,
                authorType: enums_1.MessageAuthorType.CUSTOMER,
                authorId: customerId,
                externalMessageId,
                headers: headers,
            },
        });
    }
};
exports.IngestionService = IngestionService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngestionService.prototype, "pollImap", null);
exports.IngestionService = IngestionService = IngestionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        event_emitter_1.EventEmitter2])
], IngestionService);
//# sourceMappingURL=ingestion.service.js.map