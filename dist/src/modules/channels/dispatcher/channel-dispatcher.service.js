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
var ChannelDispatcher_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelDispatcher = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const channel_not_active_exception_1 = require("./exceptions/channel-not-active.exception");
let ChannelDispatcher = ChannelDispatcher_1 = class ChannelDispatcher {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ChannelDispatcher_1.name);
        this.senders = new Map();
    }
    register(sender) {
        this.senders.set(sender.channel, sender);
        this.logger.log(`Registered sender for channel: ${sender.channel}`);
    }
    async send(orgId, ticket, conversation, message, to) {
        const connection = await this.prisma.channelConnection.findFirst({
            where: { organizationId: orgId, channel: ticket.channel },
        });
        if (!connection) {
            throw new channel_not_active_exception_1.ChannelNotActiveException(ticket.channel);
        }
        if (connection.status !== 'ACTIVE') {
            throw new channel_not_active_exception_1.ChannelNotActiveException(ticket.channel);
        }
        const sender = this.senders.get(ticket.channel);
        if (!sender) {
            throw new Error(`No sender registered for channel: ${ticket.channel}`);
        }
        const result = await sender.send({
            org: {
                organizationId: orgId,
                channel: ticket.channel,
                config: connection.config,
            },
            to,
            conversation,
            message,
        });
        await this.prisma.message.update({
            where: { id: message.id },
            data: {
                providerMessageId: result.providerMessageId,
                deliveryStatus: (result.status === 'sent' ? 'SENT' : 'PENDING'),
            },
        });
        this.logger.log(`Message sent via ${ticket.channel}: ticket=${ticket.id} msg=${message.id} provider=${result.providerMessageId}`);
        return result;
    }
};
exports.ChannelDispatcher = ChannelDispatcher;
exports.ChannelDispatcher = ChannelDispatcher = ChannelDispatcher_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChannelDispatcher);
//# sourceMappingURL=channel-dispatcher.service.js.map