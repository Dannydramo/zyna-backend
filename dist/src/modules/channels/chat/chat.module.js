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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const channel_dispatcher_service_1 = require("../dispatcher/channel-dispatcher.service");
const channel_dispatcher_module_1 = require("../dispatcher/channel-dispatcher.module");
const channel_connections_module_1 = require("../channel-connections/channel-connections.module");
const prisma_module_1 = require("../../../prisma/prisma.module");
const chat_sender_service_1 = require("./chat-sender.service");
const chat_service_1 = require("./chat.service");
const chat_controller_1 = require("./chat.controller");
const chat_ingestion_controller_1 = require("./chat-ingestion.controller");
const chat_widget_controller_1 = require("./chat-widget.controller");
let ChatModule = class ChatModule {
    constructor(dispatcher, sender) {
        this.dispatcher = dispatcher;
        this.sender = sender;
        this.dispatcher.register(sender);
    }
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, channel_dispatcher_module_1.ChannelDispatcherModule, channel_connections_module_1.ChannelConnectionsModule],
        controllers: [chat_controller_1.ChatController, chat_ingestion_controller_1.ChatIngestionController, chat_widget_controller_1.ChatWidgetController],
        providers: [chat_sender_service_1.ChatSender, chat_service_1.ChatService],
        exports: [chat_sender_service_1.ChatSender],
    }),
    __metadata("design:paramtypes", [channel_dispatcher_service_1.ChannelDispatcher, chat_sender_service_1.ChatSender])
], ChatModule);
//# sourceMappingURL=chat.module.js.map