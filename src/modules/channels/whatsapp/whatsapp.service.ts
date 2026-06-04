import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Channel, MessageAuthorType, MessageDirection } from '../../../generated/prisma/enums';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);
  private readonly META_API_URL = 'https://graph.instagram.com/v18.0';

  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventEmitter2,
  ) {}

  async handleIncomingMessage(
    phoneNumberId: string,
    fromPhoneNumber: string,
    messageBody: string,
    messageId: string,
  ) {
    // Find channel config by phone number ID
    const channel = await this.prisma.channelConnection.findFirst({
      where: {
        channel: Channel.WHATSAPP,
        config: {
          path: ['phoneNumberId'],
          equals: phoneNumberId,
        },
      },
    });

    if (!channel) {
      this.logger.warn(`[WHATSAPP_CHANNEL_NOT_FOUND] Phone number ID: ${phoneNumberId}`);
      throw new NotFoundException('WhatsApp channel not configured');
    }

    const orgId = channel.organizationId;
    this.logger.log(`[WHATSAPP_MESSAGE] Org: ${orgId}, From: ${fromPhoneNumber}, Message: ${messageBody}`);

    // Find or create customer by phone number
    const customer = await this.prisma.customer.upsert({
      where: {
        organizationId_email: { organizationId: orgId, email: `${fromPhoneNumber}@whatsapp.local` },
      },
      create: {
        organizationId: orgId,
        email: `${fromPhoneNumber}@whatsapp.local`,
        name: fromPhoneNumber,
        phone: fromPhoneNumber,
      },
      update: {},
    });

    // Find or create conversation grouped by phone number
    let conversation = await this.prisma.conversation.findFirst({
      where: {
        organizationId: orgId,
        externalThreadId: fromPhoneNumber,
        channel: Channel.WHATSAPP,
      },
      include: { ticket: true },
    });

    if (!conversation) {
      conversation = await this.prisma.conversation.create({
        data: {
          organizationId: orgId,
          customerId: customer.id,
          channel: Channel.WHATSAPP,
          externalThreadId: fromPhoneNumber,
        },
        include: { ticket: true },
      });
      this.logger.log(`[WHATSAPP_CONVERSATION] Created: ${conversation.id}`);
    }

    // Create ticket if doesn't exist
    if (!conversation.ticket) {
      await this.prisma.ticket.create({
        data: {
          organizationId: orgId,
          conversationId: conversation.id,
          channel: Channel.WHATSAPP,
          subject: `WhatsApp: ${customer.name}`,
          status: 'NEW',
          customerId: customer.id,
        },
      });
      this.logger.log(`[WHATSAPP_TICKET] Created for conversation ${conversation.id}`);
    }

    // Create inbound message
    const message = await this.prisma.message.create({
      data: {
        organizationId: orgId,
        conversationId: conversation.id,
        direction: MessageDirection.INBOUND,
        body: messageBody,
        authorType: MessageAuthorType.CUSTOMER,
        authorId: customer.id,
        externalMessageId: messageId,
      },
    });

    this.logger.log(`[WHATSAPP_MESSAGE_CREATED] Message ${message.id}`);

    // Emit event for AI processing
    const ticket = conversation.ticket || (await this.prisma.ticket.findFirst({
      where: { conversationId: conversation.id },
      select: { id: true },
    }));

    if (ticket) {
      this.events.emit('message.inbound', {
        organizationId: orgId,
        ticketId: ticket.id,
        messageId: message.id,
      });
    }

    return { data: message };
  }

  async sendMessage(orgId: string, toPhoneNumber: string, messageBody: string) {
    // Get WhatsApp config for this org
    const channel = await this.prisma.channelConnection.findFirst({
      where: {
        organizationId: orgId,
        channel: Channel.WHATSAPP,
        status: 'ACTIVE',
      },
    });

    if (!channel) {
      throw new NotFoundException('WhatsApp channel not configured');
    }

    const cfg = channel.config as any;
    const phoneNumberId = cfg.phoneNumberId;
    const accessToken = cfg.accessToken;

    if (!phoneNumberId || !accessToken) {
      throw new BadRequestException('WhatsApp credentials incomplete');
    }

    this.logger.log(`[WHATSAPP_SEND] To: ${toPhoneNumber}, Body length: ${messageBody.length}`);

    try {
      const response = await fetch(
        `${this.META_API_URL}/${phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: toPhoneNumber.replace(/[+\s-()]/g, ''), // Remove formatting
            type: 'text',
            text: { body: messageBody },
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        this.logger.error(`[WHATSAPP_SEND_ERROR] ${JSON.stringify(error)}`);
        throw new BadRequestException(`WhatsApp API error: ${error.error?.message || 'Unknown'}`);
      }

      const data = await response.json();
      this.logger.log(`✅ [WHATSAPP_SENT] Message ID: ${data.messages[0]?.id}`);

      return { data };
    } catch (error) {
      this.logger.error(`❌ [WHATSAPP_SEND_FAILED] ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }
}
