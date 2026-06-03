import { Module } from '@nestjs/common';
import { ChannelDispatcher } from '../dispatcher/channel-dispatcher.service';
import { ChannelDispatcherModule } from '../dispatcher/channel-dispatcher.module';
import { ChannelConnectionsModule } from '../channel-connections/channel-connections.module';
import { PrismaModule } from '../../../prisma/prisma.module';
import { ChatSender } from './chat-sender.service';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatIngestionController } from './chat-ingestion.controller';
import { ChatWidgetController } from './chat-widget.controller';

@Module({
  imports: [PrismaModule, ChannelDispatcherModule, ChannelConnectionsModule],
  controllers: [ChatController, ChatIngestionController, ChatWidgetController],
  providers: [ChatSender, ChatService],
  exports: [ChatSender],
})
export class ChatModule {
  constructor(private readonly dispatcher: ChannelDispatcher, private readonly sender: ChatSender) {
    this.dispatcher.register(sender);
  }
}
