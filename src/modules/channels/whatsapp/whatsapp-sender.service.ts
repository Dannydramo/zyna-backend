import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { Channel } from '../../../generated/prisma/enums';
import type { ChannelSender, ChannelSenderInput, ChannelSenderOutput } from '../dispatcher/channel-sender.interface';

@Injectable()
export class WhatsAppSender implements ChannelSender {
  readonly channel: Channel = 'WHATSAPP';
  private readonly logger = new Logger(WhatsAppSender.name);

  constructor(private readonly prisma: PrismaService) {}

  async send(input: ChannelSenderInput): Promise<ChannelSenderOutput> {
    const cfg = input.org.config as {
      phoneNumberId: string;
      displayPhoneNumber: string;
    };

    // Check 24-hour window: find the most recent inbound message in this conversation
    const lastInbound = await this.prisma.message.findFirst({
      where: {
        conversationId: input.conversation.id,
        direction: 'INBOUND',
      },
      orderBy: { createdAt: 'desc' },
    });

    const now = new Date();
    const within24h = lastInbound && new Date(lastInbound.createdAt).getTime() > now.getTime() - 24 * 60 * 60 * 1000;

    if (!within24h && !input.message.body.startsWith('TEMPLATE:')) {
      this.logger.warn(`Outside 24h window for conversation ${input.conversation.id}; template required`);
      throw new BadRequestException(
        'WhatsApp template message required (outside 24h window after last customer message)',
      );
    }

    // Mock send (in production, call Twilio/Meta API)
    const messageId = `wa-${input.message.id}`;
    this.logger.log(
      `WhatsApp message sent from ${cfg.displayPhoneNumber} to ${input.to}; id=${messageId}`,
    );

    return {
      providerMessageId: messageId,
      status: 'sent',
    };
  }
}
