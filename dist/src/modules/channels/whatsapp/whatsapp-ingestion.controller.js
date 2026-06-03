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
var WhatsAppIngestionController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppIngestionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../../../prisma/prisma.service");
const ingestion_service_1 = require("../../ingestion/ingestion.service");
let WhatsAppIngestionController = WhatsAppIngestionController_1 = class WhatsAppIngestionController {
    constructor(ingestionService, prisma) {
        this.ingestionService = ingestionService;
        this.prisma = prisma;
        this.logger = new common_1.Logger(WhatsAppIngestionController_1.name);
    }
    async ingestMessage(payload) {
        const phoneNumber = (payload.From || payload.wa_id);
        if (!phoneNumber) {
            throw new common_1.BadRequestException('Missing phone number in webhook payload');
        }
        const allConnections = await this.prisma.channelConnection.findMany({
            where: { channel: 'WHATSAPP' },
        });
        const connection = allConnections.find((c) => {
            const cfg = c.config;
            return cfg.displayPhoneNumber?.replace(/\D/g, '') === phoneNumber.replace(/\D/g, '');
        });
        if (!connection) {
            this.logger.warn(`WhatsApp webhook for unknown phone number: ${phoneNumber}`);
            throw new common_1.BadRequestException(`No WhatsApp channel configured for ${phoneNumber}`);
        }
        const messageBody = (payload.Body || payload.text);
        const fromPhone = (payload.From || payload.wa_id);
        return this.ingestionService.ingestEmail(connection.organizationId, {
            fromEmail: `${fromPhone}@whatsapp`,
            toAddress: phoneNumber,
            subject: 'WhatsApp Message',
            body: messageBody,
            messageId: `wa-${payload.MessageSid || payload.id}`,
            threadId: phoneNumber,
        });
    }
};
exports.WhatsAppIngestionController = WhatsAppIngestionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'WhatsApp webhook from Twilio/Meta (with multi-tenant routing)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsAppIngestionController.prototype, "ingestMessage", null);
exports.WhatsAppIngestionController = WhatsAppIngestionController = WhatsAppIngestionController_1 = __decorate([
    (0, swagger_1.ApiTags)('whatsapp-ingestion'),
    (0, common_1.Controller)('ingest/whatsapp'),
    __metadata("design:paramtypes", [ingestion_service_1.IngestionService,
        prisma_service_1.PrismaService])
], WhatsAppIngestionController);
//# sourceMappingURL=whatsapp-ingestion.controller.js.map