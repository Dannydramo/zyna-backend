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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../../../prisma/prisma.service");
const ingestion_service_1 = require("../../ingestion/ingestion.service");
const chat_sender_service_1 = require("./chat-sender.service");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    constructor(prisma, ingestionService, chatSender) {
        this.prisma = prisma;
        this.ingestionService = ingestionService;
        this.chatSender = chatSender;
        this.logger = new common_1.Logger(ChatGateway_1.name);
        this.visitorSockets = new Map();
    }
    async handleConnection(client) {
        const widgetId = client.handshake.auth?.widgetId;
        const visitorId = client.handshake.auth?.visitorId;
        if (!widgetId || !visitorId) {
            client.disconnect();
            return;
        }
        const connection = await this.prisma.channelConnection.findFirst({
            where: { channel: 'CHAT' },
        });
        if (!connection) {
            client.disconnect();
            return;
        }
        const cfg = connection.config;
        if (cfg.widgetId !== widgetId) {
            client.disconnect();
            return;
        }
        this.visitorSockets.set(visitorId, client.id);
        this.chatSender.registerSocket(visitorId, client);
        this.logger.log(`Chat visitor connected: ${visitorId}`);
    }
    async handleDisconnect(client) {
        for (const [visitorId, socketId] of this.visitorSockets) {
            if (socketId === client.id) {
                this.visitorSockets.delete(visitorId);
                this.chatSender.unregisterSocket(visitorId);
                this.logger.log(`Chat visitor disconnected: ${visitorId}`);
                break;
            }
        }
    }
    async handleMessage(payload) {
        const { visitorId, text } = payload;
        const connection = await this.prisma.channelConnection.findFirst({
            where: { channel: 'CHAT' },
        });
        if (!connection) {
            throw new common_1.BadRequestException('Chat channel not configured');
        }
        await this.ingestionService.ingestEmail(connection.organizationId, {
            fromEmail: `${visitorId}@chat`,
            subject: 'Chat Message',
            body: text,
            messageId: `chat-${Date.now()}`,
            threadId: visitorId,
        });
        return { ok: true };
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'chat',
        cors: { origin: '*' },
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ingestion_service_1.IngestionService,
        chat_sender_service_1.ChatSender])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map