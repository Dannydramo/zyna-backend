import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { TicketsModule } from './modules/tickets/tickets.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { CustomersModule } from './modules/customers/customers.module';
import { KnowledgeModule } from './modules/knowledge/knowledge.module';
import { AiModule } from './modules/ai/ai.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SlaModule } from './modules/sla/sla.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { IngestionModule } from './modules/ingestion/ingestion.module';
import { ChannelDispatcherModule } from './modules/channels/dispatcher/channel-dispatcher.module';
import { ChannelConnectionsModule } from './modules/channels/channel-connections/channel-connections.module';
import { EmailModule } from './modules/channels/email/email.module';
import { WhatsAppModule } from './modules/channels/whatsapp/whatsapp.module';
import { ChatModule } from './modules/channels/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    TicketsModule,
    ConversationsModule,
    CustomersModule,
    KnowledgeModule,
    AiModule,
    UsersModule,
    SlaModule,
    AnalyticsModule,
    IngestionModule,
    ChannelDispatcherModule,
    ChannelConnectionsModule,
    EmailModule,
    WhatsAppModule,
    ChatModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
