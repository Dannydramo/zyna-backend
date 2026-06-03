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
exports.EmailModule = void 0;
const common_1 = require("@nestjs/common");
const channel_dispatcher_service_1 = require("../dispatcher/channel-dispatcher.service");
const channel_dispatcher_module_1 = require("../dispatcher/channel-dispatcher.module");
const email_sender_service_1 = require("./email-sender.service");
const email_verification_service_1 = require("./email-verification.service");
const email_controller_1 = require("./email.controller");
const email_ingestion_controller_1 = require("./email-ingestion.controller");
const ingestion_module_1 = require("../../ingestion/ingestion.module");
let EmailModule = class EmailModule {
    constructor(dispatcher, sender) {
        this.dispatcher = dispatcher;
        this.sender = sender;
        this.dispatcher.register(sender);
    }
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        imports: [ingestion_module_1.IngestionModule, channel_dispatcher_module_1.ChannelDispatcherModule],
        controllers: [email_controller_1.EmailController, email_ingestion_controller_1.EmailIngestionController],
        providers: [email_sender_service_1.EmailSender, email_verification_service_1.EmailVerificationService],
        exports: [email_sender_service_1.EmailSender],
    }),
    __metadata("design:paramtypes", [channel_dispatcher_service_1.ChannelDispatcher, email_sender_service_1.EmailSender])
], EmailModule);
//# sourceMappingURL=email.module.js.map