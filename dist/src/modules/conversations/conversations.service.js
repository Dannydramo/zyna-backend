"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ConversationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../../prisma/prisma.service");
const ingestion_service_1 = require("../ingestion/ingestion.service");
let ConversationsService = ConversationsService_1 = class ConversationsService {
    constructor(prisma, events, ingestion, config) {
        this.prisma = prisma;
        this.events = events;
        this.ingestion = ingestion;
        this.config = config;
        this.logger = new common_1.Logger(ConversationsService_1.name);
    }
    async findTicketMessages(orgId, ticketId) {
        const ticket = await this.findTicket(orgId, ticketId);
        const messages = await this.prisma.message.findMany({
            where: { organizationId: orgId, conversationId: ticket.conversationId },
            orderBy: { createdAt: 'asc' },
        });
        return { data: messages };
    }
    async createAgentReply(orgId, ticketId, dto, user) {
        this.logger.log(`[REPLY_START] Agent creating reply for ticket ${ticketId}`);
        this.logger.log(`[REPLY_USER] User ${user.sub} replying`);
        this.logger.log(`[REPLY_BODY] Message length: ${dto.body.length} chars`);
        const ticket = await this.prisma.ticket.findFirst({
            where: { id: ticketId, organizationId: orgId, deletedAt: null },
            include: { customer: true, conversation: true },
        });
        if (!ticket) {
            this.logger.error(`[REPLY_ERROR] Ticket ${ticketId} not found`);
            throw new common_1.NotFoundException(`Ticket ${ticketId} not found`);
        }
        if (ticket.status === enums_1.TicketStatus.CLOSED) {
            this.logger.warn(`[REPLY_ERROR] Ticket ${ticketId} is closed`);
            throw new common_1.BadRequestException('Cannot reply to a closed ticket');
        }
        this.logger.log(`[REPLY_TICKET] Ticket found: ${ticket.subject}, Channel: ${ticket.channel}`);
        this.logger.log(`[REPLY_CUSTOMER] Customer: ${ticket.customer?.name} <${ticket.customer?.email}>`);
        const now = new Date();
        this.logger.log(`[OUTBOUND_MSG_START] Creating outbound message in DB...`);
        const message = await this.prisma.message.create({
            data: {
                organizationId: orgId,
                conversationId: ticket.conversationId,
                direction: enums_1.MessageDirection.OUTBOUND,
                body: dto.body,
                authorType: enums_1.MessageAuthorType.AGENT,
                authorId: dto.authorId ?? user.sub,
            },
        });
        this.logger.log(`[OUTBOUND_MSG_CREATED] Message ${message.id} created in DB`);
        this.logger.log(`   - Direction: ${message.direction}`);
        this.logger.log(`   - Author Type: ${message.authorType}`);
        this.logger.log(`   - Author ID: ${message.authorId}`);
        if (ticket.channel === enums_1.Channel.EMAIL && ticket.customer?.email) {
            this.logger.log(`[EMAIL_REPLY_START] Channel is EMAIL, sending reply to ${ticket.customer.email}`);
            try {
                const channelConnection = await this.prisma.channelConnection.findFirst({
                    where: {
                        organizationId: orgId,
                        channel: enums_1.Channel.EMAIL,
                        status: 'ACTIVE',
                    },
                });
                if (!channelConnection) {
                    this.logger.warn(`[EMAIL_SKIP] No active email channel found for org`);
                }
                else {
                    const cfg = channelConnection.config;
                    const fromEmail = cfg?.inboundRoutingAddress || cfg?.fromAddress || 'support@example.com';
                    const smtpConfig = {
                        host: cfg?.smtpHost,
                        port: cfg?.smtpPort,
                        secure: cfg?.smtpSecure,
                        user: cfg?.smtpUser,
                        pass: cfg?.smtpPass,
                    };
                    this.logger.log(`[SMTP_CONFIG] Using SMTP from channel config`);
                    this.logger.log(`   Host: ${smtpConfig.host}`);
                    this.logger.log(`   Port: ${smtpConfig.port}`);
                    this.logger.log(`   Secure: ${smtpConfig.secure}`);
                    this.logger.log(`   User: ${smtpConfig.user}`);
                    const emailPayload = {
                        to: ticket.customer.email,
                        from: fromEmail,
                        subject: `Re: ${ticket.subject}`,
                        body: dto.body,
                        smtpConfig,
                        ...(ticket.conversation?.externalThreadId && {
                            inReplyTo: ticket.conversation.externalThreadId,
                        }),
                    };
                    this.logger.log(`[EMAIL_PAYLOAD] From: ${emailPayload.from}`);
                    this.logger.log(`[EMAIL_PAYLOAD] To: ${emailPayload.to}`);
                    this.logger.log(`[EMAIL_PAYLOAD] Subject: ${emailPayload.subject}`);
                    this.logger.log(`[EMAIL_PAYLOAD] InReplyTo: ${emailPayload.inReplyTo || 'none'}`);
                    await this.ingestion.sendEmail(emailPayload);
                    this.logger.log(`✅ [EMAIL_SENT] Reply email sent from ${fromEmail} to ${ticket.customer.email}`);
                }
            }
            catch (err) {
                this.logger.error(`❌ [EMAIL_FAILED] Failed to send email: ${err instanceof Error ? err.message : String(err)}`);
                this.logger.error(`[EMAIL_STACK] ${err instanceof Error ? err.stack : 'No stack'}`);
            }
        }
        else {
            if (ticket.channel !== enums_1.Channel.EMAIL) {
                this.logger.log(`[EMAIL_SKIP] Channel is ${ticket.channel}, not EMAIL`);
            }
            if (!ticket.customer?.email) {
                this.logger.log(`[EMAIL_SKIP] No customer email address`);
            }
        }
        if (ticket.channel === enums_1.Channel.CHAT) {
            this.logger.log(`[CHAT_REPLY] Chat message saved to DB, widget will poll for it`);
        }
        this.logger.log(`[TICKET_UPDATE_START] Updating ticket status and firstResponseAt...`);
        await this.prisma.ticket.update({
            where: { id: ticket.id },
            data: {
                firstResponseAt: ticket.firstResponseAt ?? now,
                ...(ticket.status === enums_1.TicketStatus.NEW && {
                    status: enums_1.TicketStatus.OPEN,
                }),
            },
        });
        this.logger.log(`✅ [TICKET_UPDATED] Ticket status updated`);
        await this.writeAudit(orgId, user.sub, 'REPLY', 'Message', message.id, {
            ticketId,
        });
        this.logger.log(`✅ [AUDIT_LOGGED] Audit record created`);
        this.logger.log(`[REPLY_COMPLETE] Reply process finished for ticket ${ticketId}\n`);
        return { data: message };
    }
    async createInboundMessage(orgId, ticketId, body, customerId, externalMessageId, headers = {}) {
        const ticket = await this.findTicket(orgId, ticketId);
        const message = await this.prisma.message.create({
            data: {
                organizationId: orgId,
                conversationId: ticket.conversationId,
                direction: enums_1.MessageDirection.INBOUND,
                body,
                authorType: enums_1.MessageAuthorType.CUSTOMER,
                authorId: customerId,
                externalMessageId,
                headers: headers,
            },
        });
        this.events.emit('message.inbound', {
            organizationId: orgId,
            ticketId,
            messageId: message.id,
        });
        return message;
    }
    async findTicket(orgId, ticketId) {
        const ticket = await this.prisma.ticket.findFirst({
            where: { id: ticketId, organizationId: orgId, deletedAt: null },
        });
        if (!ticket)
            throw new common_1.NotFoundException(`Ticket ${ticketId} not found`);
        if (ticket.status === enums_1.TicketStatus.CLOSED) {
            throw new common_1.BadRequestException('Cannot reply to a closed ticket');
        }
        return ticket;
    }
    async writeAudit(orgId, actorId, action, entityType, entityId, metadata) {
        await this.prisma.auditRecord.create({
            data: {
                organizationId: orgId,
                actorType: enums_1.AuditActorType.USER,
                actorId,
                action,
                entityType,
                entityId,
                metadata: metadata,
            },
        });
    }
};
exports.ConversationsService = ConversationsService;
exports.ConversationsService = ConversationsService = ConversationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2,
        ingestion_service_1.IngestionService,
        config_1.ConfigService])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map