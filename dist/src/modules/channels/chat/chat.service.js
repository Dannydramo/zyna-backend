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
var ChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const enums_1 = require("../../../generated/prisma/enums");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ChatService = ChatService_1 = class ChatService {
    constructor(prisma, events) {
        this.prisma = prisma;
        this.events = events;
        this.logger = new common_1.Logger(ChatService_1.name);
    }
    async startSession(widgetId, visitorId) {
        const connection = await this.prisma.channelConnection.findFirst({
            where: { channel: enums_1.Channel.CHAT, status: 'ACTIVE' },
        });
        if (!connection) {
            throw new common_1.NotFoundException('Chat channel not configured');
        }
        const cfg = connection.config;
        if (cfg.widgetId !== widgetId) {
            throw new common_1.BadRequestException('Invalid widget ID');
        }
        const sessionId = `${visitorId}-${Date.now()}`;
        this.logger.log(`[CHAT_SESSION_START] Session ${sessionId} for visitor ${visitorId}`);
        return { sessionId, orgId: connection.organizationId };
    }
    async sendMessage(orgId, sessionId, body, visitorEmail) {
        let customerId;
        if (visitorEmail) {
            const customer = await this.prisma.customer.upsert({
                where: {
                    organizationId_email: { organizationId: orgId, email: visitorEmail },
                },
                create: {
                    organizationId: orgId,
                    email: visitorEmail,
                    name: visitorEmail.split('@')[0],
                },
                update: {},
            });
            customerId = customer.id;
            this.logger.log(`[CHAT_CUSTOMER] Upserted customer with email: ${visitorEmail}`);
        }
        else {
            const anonymousEmail = `${sessionId}@chat.local`;
            const customer = await this.prisma.customer.upsert({
                where: {
                    organizationId_email: { organizationId: orgId, email: anonymousEmail },
                },
                create: {
                    organizationId: orgId,
                    email: anonymousEmail,
                    name: `Visitor-${sessionId.slice(0, 8)}`,
                },
                update: {},
            });
            customerId = customer.id;
        }
        let conversation = await this.prisma.conversation.findFirst({
            where: {
                organizationId: orgId,
                externalThreadId: sessionId,
                channel: enums_1.Channel.CHAT,
            },
            include: { ticket: true },
        });
        if (!conversation) {
            conversation = await this.prisma.conversation.create({
                data: {
                    organizationId: orgId,
                    customerId,
                    channel: enums_1.Channel.CHAT,
                    externalThreadId: sessionId,
                },
                include: { ticket: true },
            });
            this.logger.log(`[CHAT_CONVERSATION] Created conversation ${conversation.id}`);
        }
        if (!conversation.ticket) {
            const customer = await this.prisma.customer.findUnique({
                where: { id: customerId },
            });
            await this.prisma.ticket.create({
                data: {
                    organizationId: orgId,
                    conversationId: conversation.id,
                    channel: enums_1.Channel.CHAT,
                    subject: `Chat: ${customer?.name || 'Visitor'}`,
                    status: 'NEW',
                    customerId,
                },
            });
            this.logger.log(`[CHAT_TICKET] Created ticket for conversation ${conversation.id}`);
        }
        const message = await this.prisma.message.create({
            data: {
                organizationId: orgId,
                conversationId: conversation.id,
                direction: enums_1.MessageDirection.INBOUND,
                body,
                authorType: enums_1.MessageAuthorType.CUSTOMER,
                authorId: customerId,
                externalMessageId: `chat-${Date.now()}`,
            },
        });
        this.logger.log(`[CHAT_MESSAGE] Created message ${message.id} in conversation ${conversation.id}`);
        this.events.emit('message.inbound', {
            organizationId: orgId,
            ticketId: conversation.ticket?.id || (await this.prisma.ticket.findFirst({
                where: { conversationId: conversation.id },
                select: { id: true },
            }))?.id,
            messageId: message.id,
        });
        return { data: message };
    }
    async getMessages(orgId, sessionId, since) {
        const conversation = await this.prisma.conversation.findFirst({
            where: {
                organizationId: orgId,
                externalThreadId: sessionId,
                channel: enums_1.Channel.CHAT,
            },
        });
        if (!conversation) {
            return { data: [] };
        }
        const whereClause = {
            organizationId: orgId,
            conversationId: conversation.id,
        };
        if (since) {
            const sinceDate = new Date(since);
            whereClause.createdAt = { gt: sinceDate };
        }
        const messages = await this.prisma.message.findMany({
            where: whereClause,
            orderBy: { createdAt: 'asc' },
            select: {
                id: true,
                body: true,
                direction: true,
                authorType: true,
                createdAt: true,
            },
        });
        return { data: messages };
    }
    async updateSession(orgId, sessionId, email) {
        const conversation = await this.prisma.conversation.findFirst({
            where: {
                organizationId: orgId,
                externalThreadId: sessionId,
                channel: enums_1.Channel.CHAT,
            },
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Chat session not found');
        }
        const customer = await this.prisma.customer.upsert({
            where: {
                organizationId_email: { organizationId: orgId, email },
            },
            create: {
                organizationId: orgId,
                email,
                name: email.split('@')[0],
            },
            update: {},
        });
        await this.prisma.conversation.update({
            where: { id: conversation.id },
            data: { customerId: customer.id },
        });
        await this.prisma.message.updateMany({
            where: { conversationId: conversation.id },
            data: { authorId: customer.id },
        });
        this.logger.log(`[CHAT_EMAIL_LINK] Linked session ${sessionId} to email ${email}`);
        return { ok: true };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = ChatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], ChatService);
//# sourceMappingURL=chat.service.js.map