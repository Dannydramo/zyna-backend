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
exports.WhatsAppModule = void 0;
const common_1 = require("@nestjs/common");
const channel_dispatcher_service_1 = require("../dispatcher/channel-dispatcher.service");
const channel_dispatcher_module_1 = require("../dispatcher/channel-dispatcher.module");
const channel_connections_module_1 = require("../channel-connections/channel-connections.module");
const whatsapp_sender_service_1 = require("./whatsapp-sender.service");
const whatsapp_controller_1 = require("./whatsapp.controller");
const whatsapp_ingestion_controller_1 = require("./whatsapp-ingestion.controller");
const ingestion_module_1 = require("../../ingestion/ingestion.module");
let WhatsAppModule = class WhatsAppModule {
    constructor(dispatcher, sender) {
        this.dispatcher = dispatcher;
        this.sender = sender;
        this.dispatcher.register(sender);
    }
};
exports.WhatsAppModule = WhatsAppModule;
exports.WhatsAppModule = WhatsAppModule = __decorate([
    (0, common_1.Module)({
        imports: [ingestion_module_1.IngestionModule, channel_dispatcher_module_1.ChannelDispatcherModule, channel_connections_module_1.ChannelConnectionsModule],
        controllers: [whatsapp_controller_1.WhatsAppController, whatsapp_ingestion_controller_1.WhatsAppIngestionController],
        providers: [whatsapp_sender_service_1.WhatsAppSender],
        exports: [whatsapp_sender_service_1.WhatsAppSender],
    }),
    __metadata("design:paramtypes", [channel_dispatcher_service_1.ChannelDispatcher, whatsapp_sender_service_1.WhatsAppSender])
], WhatsAppModule);
//# sourceMappingURL=whatsapp.module.js.map