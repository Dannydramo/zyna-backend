import { Injectable, Logger } from '@nestjs/common';
import type { Ticket, Message, Conversation } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ChannelNotActiveException } from './exceptions/channel-not-active.exception';
import type { ChannelSender } from './channel-sender.interface.ts';

@Injectable()
export class ChannelDispatcher {
  private readonly logger = new Logger(ChannelDispatcher.name);
  private senders: Map<string, ChannelSender> = new Map();

  constructor(private readonly prisma: PrismaService) {}

  register(sender: ChannelSender) {
    this.senders.set(sender.channel, sender);
    this.logger.log(`Registered sender for channel: ${sender.channel}`);
  }

  async send(
    orgId: string,
    ticket: Ticket,
    conversation: Conversation,
    message: Message,
    to: string,
  ): Promise<{ providerMessageId: string; status: string }> {
    // 1. Load the org's ChannelConnection for the ticket's channel
    const connection = await this.prisma.channelConnection.findFirst({
      where: { organizationId: orgId, channel: ticket.channel },
    });

    if (!connection) {
      throw new ChannelNotActiveException(ticket.channel);
    }

    // 2. Verify the connection is ACTIVE
    if (connection.status !== 'ACTIVE') {
      throw new ChannelNotActiveException(ticket.channel);
    }

    // 3. Get the appropriate sender
    const sender = this.senders.get(ticket.channel);
    if (!sender) {
      throw new Error(`No sender registered for channel: ${ticket.channel}`);
    }

    // 4. Call the sender
    const result = await sender.send({
      org: {
        organizationId: orgId,
        channel: ticket.channel,
        config: connection.config as Record<string, unknown>,
      },
      to,
      conversation,
      message,
    });

    // 5. Update the message with provider IDs + delivery status
    await this.prisma.message.update({
      where: { id: message.id },
      data: {
        providerMessageId: result.providerMessageId,
        deliveryStatus: (result.status === 'sent' ? 'SENT' : 'PENDING') as 'SENT' | 'PENDING' | 'DELIVERED' | 'FAILED',
      },
    });

    this.logger.log(
      `Message sent via ${ticket.channel}: ticket=${ticket.id} msg=${message.id} provider=${result.providerMessageId}`,
    );

    return result;
  }
}
