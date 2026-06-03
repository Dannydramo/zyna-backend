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
var WhatsAppSender_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppSender = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let WhatsAppSender = WhatsAppSender_1 = class WhatsAppSender {
    constructor(prisma) {
        this.prisma = prisma;
        this.channel = 'WHATSAPP';
        this.logger = new common_1.Logger(WhatsAppSender_1.name);
    }
    async send(input) {
        const cfg = input.org.config;
        const lastInbound = await this.prisma.message.findFirst({
            where: {
                conversationId: input.conversation.id,
                direction: 'INBOUND',
            },
            orderBy: { createdAt: 'desc' },
        });
        const now = new Date();
        const within24h = lastInbound && new Date(lastInbound.createdAt).getTime() > now.getTime() - 24 * 60 * 60 * 1000;
        if (!within24h && !input.message.body.startsWith('TEMPLATE:')) {
            this.logger.warn(`Outside 24h window for conversation ${input.conversation.id}; template required`);
            throw new common_1.BadRequestException('WhatsApp template message required (outside 24h window after last customer message)');
        }
        const messageId = `wa-${input.message.id}`;
        this.logger.log(`WhatsApp message sent from ${cfg.displayPhoneNumber} to ${input.to}; id=${messageId}`);
        return {
            providerMessageId: messageId,
            status: 'sent',
        };
    }
};
exports.WhatsAppSender = WhatsAppSender;
exports.WhatsAppSender = WhatsAppSender = WhatsAppSender_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WhatsAppSender);
//# sourceMappingURL=whatsapp-sender.service.js.map