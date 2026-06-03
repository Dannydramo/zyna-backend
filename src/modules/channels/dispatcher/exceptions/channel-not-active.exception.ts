import { BadRequestException } from '@nestjs/common';
import type { Channel } from '../../../../generated/prisma/enums';

export class ChannelNotActiveException extends BadRequestException {
  constructor(channel: Channel) {
    super(`Channel ${channel} is not yet active. Please configure and verify it in Settings.`);
    this.name = 'ChannelNotActiveException';
  }
}
