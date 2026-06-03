import { PrismaService } from '../../../prisma/prisma.service';
import type { Channel } from '../../../generated/prisma/enums';
import type { ChannelSender, ChannelSenderInput, ChannelSenderOutput } from '../dispatcher/channel-sender.interface';
export declare class WhatsAppSender implements ChannelSender {
    private readonly prisma;
    readonly channel: Channel;
    private readonly logger;
    constructor(prisma: PrismaService);
    send(input: ChannelSenderInput): Promise<ChannelSenderOutput>;
}
