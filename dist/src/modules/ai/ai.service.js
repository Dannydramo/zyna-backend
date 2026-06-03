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
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../../prisma/prisma.service");
const knowledge_service_1 = require("../knowledge/knowledge.service");
const ingestion_service_1 = require("../ingestion/ingestion.service");
const llm_provider_1 = require("./llm/llm-provider");
let AiService = AiService_1 = class AiService {
    constructor(prisma, knowledge, llm, ingestion) {
        this.prisma = prisma;
        this.knowledge = knowledge;
        this.llm = llm;
        this.ingestion = ingestion;
        this.logger = new common_1.Logger(AiService_1.name);
    }
    async handleInboundMessage(event) {
        await this.suggest(event.organizationId, event.ticketId, event.messageId);
    }
    async getSuggestion(orgId, ticketId) {
        const ticket = await this.prisma.ticket.findFirst({
            where: { id: ticketId, organizationId: orgId, deletedAt: null },
        });
        if (!ticket)
            throw new common_1.NotFoundException(`Ticket ${ticketId} not found`);
        const suggestion = await this.prisma.aiSuggestion.findFirst({
            where: {
                organizationId: orgId,
                ticketId,
                rejectedAt: null,
            },
            orderBy: { createdAt: 'desc' },
        });
        return { data: suggestion };
    }
    async suggest(orgId, ticketId, messageId) {
        const ticket = await this.prisma.ticket.findFirst({
            where: { id: ticketId, organizationId: orgId, deletedAt: null },
            include: {
                conversation: {
                    include: {
                        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
                    },
                },
            },
        });
        if (!ticket)
            throw new common_1.NotFoundException(`Ticket ${ticketId} not found`);
        const message = (messageId &&
            (await this.prisma.message.findFirst({
                where: {
                    id: messageId,
                    organizationId: orgId,
                    conversationId: ticket.conversationId,
                },
            }))) ??
            ticket.conversation.messages[0];
        if (!message)
            throw new common_1.BadRequestException('Ticket has no message to analyze');
        const articles = await this.knowledge.retrieve(orgId, `${ticket.subject} ${message.body}`, 3);
        const suggestion = await this.llm.generateSuggestion({
            subject: ticket.subject,
            message: message.body,
            articles: articles.map((article) => ({
                id: article.id,
                title: article.title,
                body: article.body,
            })),
        });
        if (!suggestion.citations.length) {
            throw new common_1.BadRequestException('AI suggestions require at least one citation');
        }
        const record = await this.prisma.aiSuggestion.create({
            data: {
                organizationId: orgId,
                ticketId,
                messageId: message.id,
                intent: suggestion.intent,
                draft: suggestion.draft,
                citations: suggestion.citations,
                confidence: suggestion.confidence,
            },
        });
        await this.prisma.ticket.update({
            where: { id: ticketId },
            data: { aiStatus: enums_1.AiStatus.SUGGESTED, intent: suggestion.intent },
        });
        await this.audit(orgId, 'AI_SUGGEST', 'AiSuggestion', record.id, {
            ticketId,
            messageId: message.id,
            citations: suggestion.citations,
            confidence: suggestion.confidence,
            intent: suggestion.intent,
        });
        return { data: record };
    }
    async accept(orgId, ticketId, suggestionId) {
        const suggestion = await this.prisma.aiSuggestion.findFirst({
            where: {
                organizationId: orgId,
                ticketId,
                ...(suggestionId && { id: suggestionId }),
                rejectedAt: null,
            },
            orderBy: { createdAt: 'desc' },
        });
        if (!suggestion)
            throw new common_1.NotFoundException('AI suggestion not found');
        if (!Array.isArray(suggestion.citations) ||
            suggestion.citations.length === 0) {
            throw new common_1.BadRequestException('Cannot accept a suggestion without citations');
        }
        const ticket = await this.prisma.ticket.findFirst({
            where: { id: ticketId, organizationId: orgId, deletedAt: null },
            include: {
                conversation: true,
                customer: true,
            },
        });
        if (!ticket)
            throw new common_1.NotFoundException(`Ticket ${ticketId} not found`);
        let messageBody = suggestion.draft;
        if (Array.isArray(suggestion.citations) && suggestion.citations.length > 0) {
            const articles = await this.prisma.knowledgeArticle.findMany({
                where: {
                    id: { in: suggestion.citations },
                    organizationId: orgId,
                },
                select: { id: true, title: true },
            });
            if (articles.length > 0) {
                const articleLinks = articles
                    .map((a) => `[${a.title}](article://${a.id})`)
                    .join('\n');
                messageBody = `${suggestion.draft}\n\n**Helpful resources:**\n${articleLinks}`;
            }
        }
        const message = await this.prisma.message.create({
            data: {
                organizationId: orgId,
                conversationId: ticket.conversationId,
                direction: enums_1.MessageDirection.OUTBOUND,
                body: messageBody,
                authorType: enums_1.MessageAuthorType.AI,
                authorId: suggestion.id,
            },
        });
        await this.prisma.$transaction([
            this.prisma.aiSuggestion.update({
                where: { id: suggestion.id },
                data: { acceptedAt: new Date() },
            }),
            this.prisma.ticket.update({
                where: { id: ticketId },
                data: {
                    aiStatus: enums_1.AiStatus.RESOLVED,
                    firstResponseAt: ticket.firstResponseAt ?? new Date(),
                },
            }),
        ]);
        if (ticket.channel === enums_1.Channel.EMAIL && ticket.customer?.email) {
            this.logger.log(`[AI_EMAIL_START] Sending AI response to ${ticket.customer.email}`);
            try {
                const channelConnection = await this.prisma.channelConnection.findFirst({
                    where: {
                        organizationId: orgId,
                        channel: enums_1.Channel.EMAIL,
                        status: 'ACTIVE',
                    },
                });
                if (!channelConnection) {
                    this.logger.warn(`[AI_EMAIL_SKIP] No active email channel found for org`);
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
                    const emailPayload = {
                        to: ticket.customer.email,
                        from: fromEmail,
                        subject: `Re: ${ticket.subject}`,
                        body: suggestion.draft,
                        smtpConfig,
                        ...(ticket.conversation?.externalThreadId && {
                            inReplyTo: ticket.conversation.externalThreadId,
                        }),
                    };
                    await this.ingestion.sendEmail(emailPayload);
                    this.logger.log(`✅ [AI_EMAIL_SENT] AI response sent to ${ticket.customer.email}`);
                }
            }
            catch (error) {
                this.logger.error(`❌ [AI_EMAIL_FAILED] Failed to send AI response: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
        await this.audit(orgId, 'AI_ACCEPT', 'AiSuggestion', suggestion.id, {
            ticketId,
            messageId: message.id,
        });
        return { data: message };
    }
    async reject(orgId, suggestionId) {
        const suggestion = await this.prisma.aiSuggestion.findFirst({
            where: {
                id: suggestionId,
                organizationId: orgId,
                rejectedAt: null,
            },
        });
        if (!suggestion)
            throw new common_1.NotFoundException('AI suggestion not found');
        await this.prisma.aiSuggestion.update({
            where: { id: suggestionId },
            data: { rejectedAt: new Date() },
        });
        await this.audit(orgId, 'AI_REJECT', 'AiSuggestion', suggestionId, {});
        return { data: { success: true } };
    }
    async audit(orgId, action, entityType, entityId, metadata) {
        await this.prisma.auditRecord.create({
            data: {
                organizationId: orgId,
                actorType: enums_1.AuditActorType.AI,
                action,
                entityType,
                entityId,
                metadata: metadata,
            },
        });
    }
};
exports.AiService = AiService;
__decorate([
    (0, event_emitter_1.OnEvent)('message.inbound'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiService.prototype, "handleInboundMessage", null);
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        knowledge_service_1.KnowledgeService,
        llm_provider_1.LlmProvider,
        ingestion_service_1.IngestionService])
], AiService);
//# sourceMappingURL=ai.service.js.map