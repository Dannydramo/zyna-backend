import type { Channel, Message, Conversation } from '../../../generated/prisma/client';
export interface ChannelSenderInput {
    org: {
        organizationId: string;
        channel: Channel;
        config: Record<string, unknown>;
    };
    to: string;
    conversation: Conversation;
    message: Message;
}
export interface ChannelSenderOutput {
    providerMessageId: string;
    status: 'sent' | 'queued' | 'failed';
}
export interface ChannelSender {
    channel: Channel;
    send(input: ChannelSenderInput): Promise<ChannelSenderOutput>;
}
