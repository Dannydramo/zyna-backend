import { Module } from '@nestjs/common';
import { ChannelDispatcher } from '../dispatcher/channel-dispatcher.service';
import { ChannelDispatcherModule } from '../dispatcher/channel-dispatcher.module';
import { EmailSender } from './email-sender.service';
import { EmailVerificationService } from './email-verification.service';
import { EmailController } from './email.controller';
import { EmailIngestionController } from './email-ingestion.controller';
import { IngestionModule } from '../../ingestion/ingestion.module';

@Module({
  imports: [IngestionModule, ChannelDispatcherModule],
  controllers: [EmailController, EmailIngestionController],
  providers: [EmailSender, EmailVerificationService],
  exports: [EmailSender],
})
export class EmailModule {
  constructor(private readonly dispatcher: ChannelDispatcher, private readonly sender: EmailSender) {
    // Register the email sender with the dispatcher
    this.dispatcher.register(sender);
  }
}
