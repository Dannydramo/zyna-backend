"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const prisma_module_1 = require("./prisma/prisma.module");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const tickets_module_1 = require("./modules/tickets/tickets.module");
const conversations_module_1 = require("./modules/conversations/conversations.module");
const customers_module_1 = require("./modules/customers/customers.module");
const knowledge_module_1 = require("./modules/knowledge/knowledge.module");
const ai_module_1 = require("./modules/ai/ai.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const sla_module_1 = require("./modules/sla/sla.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const ingestion_module_1 = require("./modules/ingestion/ingestion.module");
const channel_dispatcher_module_1 = require("./modules/channels/dispatcher/channel-dispatcher.module");
const channel_connections_module_1 = require("./modules/channels/channel-connections/channel-connections.module");
const email_module_1 = require("./modules/channels/email/email.module");
const whatsapp_module_1 = require("./modules/channels/whatsapp/whatsapp.module");
const chat_module_1 = require("./modules/channels/chat/chat.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            event_emitter_1.EventEmitterModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            tickets_module_1.TicketsModule,
            conversations_module_1.ConversationsModule,
            customers_module_1.CustomersModule,
            knowledge_module_1.KnowledgeModule,
            ai_module_1.AiModule,
            users_module_1.UsersModule,
            sla_module_1.SlaModule,
            analytics_module_1.AnalyticsModule,
            ingestion_module_1.IngestionModule,
            channel_dispatcher_module_1.ChannelDispatcherModule,
            channel_connections_module_1.ChannelConnectionsModule,
            email_module_1.EmailModule,
            whatsapp_module_1.WhatsAppModule,
            chat_module_1.ChatModule,
        ],
        providers: [{ provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map