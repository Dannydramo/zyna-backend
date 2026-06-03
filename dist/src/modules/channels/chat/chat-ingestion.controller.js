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
var ChatIngestionController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatIngestionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../../../prisma/prisma.service");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const chat_service_1 = require("./chat.service");
let ChatIngestionController = ChatIngestionController_1 = class ChatIngestionController {
    constructor(chatService, prisma) {
        this.chatService = chatService;
        this.prisma = prisma;
        this.logger = new common_1.Logger(ChatIngestionController_1.name);
    }
    async startSession(dto) {
        return this.chatService.startSession(dto.widgetId, dto.visitorId);
    }
    async sendMessage(sessionId, dto) {
        const connection = await this.prisma.channelConnection.findFirst({
            where: { channel: 'CHAT', status: 'ACTIVE' },
        });
        if (!connection) {
            throw new common_1.BadRequestException('Chat channel not configured');
        }
        const cfg = connection.config;
        if (cfg.widgetId !== dto.widgetId) {
            throw new common_1.BadRequestException('Invalid widget ID');
        }
        return this.chatService.sendMessage(connection.organizationId, sessionId, dto.text, dto.visitorEmail);
    }
    async getMessages(sessionId, widgetId, since) {
        const connection = await this.prisma.channelConnection.findFirst({
            where: { channel: 'CHAT', status: 'ACTIVE' },
        });
        if (!connection) {
            throw new common_1.BadRequestException('Chat channel not configured');
        }
        const cfg = connection.config;
        if (cfg.widgetId !== widgetId) {
            throw new common_1.BadRequestException('Invalid widget ID');
        }
        return this.chatService.getMessages(connection.organizationId, sessionId, since);
    }
    async updateSession(sessionId, dto) {
        const connection = await this.prisma.channelConnection.findFirst({
            where: { channel: 'CHAT', status: 'ACTIVE' },
        });
        if (!connection) {
            throw new common_1.BadRequestException('Chat channel not configured');
        }
        const cfg = connection.config;
        if (cfg.widgetId !== dto.widgetId) {
            throw new common_1.BadRequestException('Invalid widget ID');
        }
        return this.chatService.updateSession(connection.organizationId, sessionId, dto.email);
    }
};
exports.ChatIngestionController = ChatIngestionController;
__decorate([
    (0, common_1.Post)('sessions'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Start a new chat session' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatIngestionController.prototype, "startSession", null);
__decorate([
    (0, common_1.Post)('sessions/:sessionId/messages'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Send a chat message (visitor → agent)' }),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatIngestionController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('sessions/:sessionId/messages'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get chat messages (widget polls for new messages)' }),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Query)('widgetId')),
    __param(2, (0, common_1.Query)('since')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChatIngestionController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Patch)('sessions/:sessionId'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update session with email (visitor provides email)' }),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatIngestionController.prototype, "updateSession", null);
exports.ChatIngestionController = ChatIngestionController = ChatIngestionController_1 = __decorate([
    (0, swagger_1.ApiTags)('chat-ingestion'),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        prisma_service_1.PrismaService])
], ChatIngestionController);
//# sourceMappingURL=chat-ingestion.controller.js.map