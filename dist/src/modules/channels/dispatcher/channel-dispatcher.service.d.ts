import type { Ticket, Message, Conversation } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import type { ChannelSender } from './channel-sender.interface.ts';
export declare class ChannelDispatcher {
    private readonly prisma;
    private readonly logger;
    private senders;
    constructor(prisma: PrismaService);
    register(sender: ChannelSender): void;
    send(orgId: string, ticket: Ticket, conversation: Conversation, message: Message, to: string): Promise<{
        providerMessageId: string;
        status: string;
    }>;
}
