import { ConfigService } from '@nestjs/config';
import type { Channel } from '../../../generated/prisma/enums';
import type { ChannelSender, ChannelSenderInput, ChannelSenderOutput } from '../dispatcher/channel-sender.interface';
export declare class EmailSender implements ChannelSender {
    private readonly config;
    readonly channel: Channel;
    private readonly logger;
    constructor(config: ConfigService);
    send(input: ChannelSenderInput): Promise<ChannelSenderOutput>;
}
