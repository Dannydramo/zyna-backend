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
var ChatSender_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSender = void 0;
const common_1 = require("@nestjs/common");
let ChatSender = ChatSender_1 = class ChatSender {
    constructor() {
        this.channel = 'CHAT';
        this.logger = new common_1.Logger(ChatSender_1.name);
        this.socketConnections = new Map();
    }
    registerSocket(visitorId, socket) {
        this.socketConnections.set(visitorId, socket);
        this.logger.debug(`Chat socket registered for visitor: ${visitorId}`);
    }
    unregisterSocket(visitorId) {
        this.socketConnections.delete(visitorId);
    }
    async send(input) {
        const messageId = `chat-${input.message.id}`;
        this.logger.log(`Chat message queued for ${input.to}: ${messageId}`);
        return {
            providerMessageId: messageId,
            status: 'sent',
        };
    }
};
exports.ChatSender = ChatSender;
exports.ChatSender = ChatSender = ChatSender_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ChatSender);
//# sourceMappingURL=chat-sender.service.js.map