import { Module } from '@nestjs/common';
import { ChannelDispatcher } from '../dispatcher/channel-dispatcher.service';
import { ChannelDispatcherModule } from '../dispatcher/channel-dispatcher.module';
import { ChannelConnectionsModule } from '../channel-connections/channel-connections.module';
import { WhatsAppSender } from './whatsapp-sender.service';
import { WhatsAppController } from './whatsapp.controller';
import { WhatsAppIngestionController } from './whatsapp-ingestion.controller';
import { IngestionModule } from '../../ingestion/ingestion.module';

@Module({
  imports: [IngestionModule, ChannelDispatcherModule, ChannelConnectionsModule],
  controllers: [WhatsAppController, WhatsAppIngestionController],
  providers: [WhatsAppSender],
  exports: [WhatsAppSender],
})
export class WhatsAppModule {
  constructor(private readonly dispatcher: ChannelDispatcher, private readonly sender: WhatsAppSender) {
    this.dispatcher.register(sender);
  }
}
