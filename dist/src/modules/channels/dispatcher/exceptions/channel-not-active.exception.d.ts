import { BadRequestException } from '@nestjs/common';
import type { Channel } from '../../../../generated/prisma/enums';
export declare class ChannelNotActiveException extends BadRequestException {
    constructor(channel: Channel);
}
