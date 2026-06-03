import { Module } from '@nestjs/common';
import { ChannelDispatcher } from './channel-dispatcher.service';

@Module({
  providers: [ChannelDispatcher],
  exports: [ChannelDispatcher],
})
export class ChannelDispatcherModule {}
