import type { Channel } from '../../../generated/prisma/enums';
import type { ChannelSender, ChannelSenderInput, ChannelSenderOutput } from '../dispatcher/channel-sender.interface';
export declare class ChatSender implements ChannelSender {
    readonly channel: Channel;
    private readonly logger;
    private socketConnections;
    constructor();
    registerSocket(visitorId: string, socket: unknown): void;
    unregisterSocket(visitorId: string): void;
    send(input: ChannelSenderInput): Promise<ChannelSenderOutput>;
}
