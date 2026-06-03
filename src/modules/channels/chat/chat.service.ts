import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Channel, MessageAuthorType, MessageDirection } from '../../../generated/prisma/enums';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventEmitter2,
  ) {}

  async startSession(
    widgetId: string,
    visitorId: string,
  ): Promise<{ sessionId: string; orgId: string }> {
    const connection = await this.prisma.channelConnection.findFirst({
      where: { channel: Channel.CHAT, status: 'ACTIVE' },
    });

    if (!connection) {
      throw new NotFoundException('Chat channel not configured');
    }

    const cfg = connection.config as Record<string, unknown>;
    if (cfg.widgetId !== widgetId) {
      throw new BadRequestException('Invalid widget ID');
    }

    const sessionId = `${visitorId}-${Date.now()}`;
    this.logger.log(`[CHAT_SESSION_START] Session ${sessionId} for visitor ${visitorId}`);

    return { sessionId, orgId: connection.organizationId };
  }

  async sendMessage(
    orgId: string,
    sessionId: string,
    body: string,
    visitorEmail?: string,
  ) {
    // Find or create customer
    let customerId: string;

    if (visitorEmail) {
      const customer = await this.prisma.customer.upsert({
        where: {
          organizationId_email: { organizationId: orgId, email: visitorEmail },
        },
        create: {
          organizationId: orgId,
          email: visitorEmail,
          name: visitorEmail.split('@')[0],
        },
        update: {},
      });
      customerId = customer.id;
      this.logger.log(`[CHAT_CUSTOMER] Upserted customer with email: ${visitorEmail}`);
    } else {
      // Anonymous visitor - use sessionId as pseudo-email
      const anonymousEmail = `${sessionId}@chat.local`;
      const customer = await this.prisma.customer.upsert({
        where: {
          organizationId_email: { organizationId: orgId, email: anonymousEmail },
        },
        create: {
          organizationId: orgId,
          email: anonymousEmail,
          name: `Visitor-${sessionId.slice(0, 8)}`,
        },
        update: {},
      });
      customerId = customer.id;
    }

    // Find or create conversation (grouped by sessionId as externalThreadId)
    let conversation = await this.prisma.conversation.findFirst({
      where: {
        organizationId: orgId,
        externalThreadId: sessionId,
        channel: Channel.CHAT,
      },
      include: { ticket: true },
    });

    if (!conversation) {
      conversation = await this.prisma.conversation.create({
        data: {
          organizationId: orgId,
          customerId,
          channel: Channel.CHAT,
          externalThreadId: sessionId,
        },
        include: { ticket: true },
      });
      this.logger.log(`[CHAT_CONVERSATION] Created conversation ${conversation.id}`);
    }

    // Create ticket if doesn't exist
    if (!conversation.ticket) {
      const customer = await this.prisma.customer.findUnique({
        where: { id: customerId },
      });

      await this.prisma.ticket.create({
        data: {
          organizationId: orgId,
          conversationId: conversation.id,
          channel: Channel.CHAT,
          subject: `Chat: ${customer?.name || 'Visitor'}`,
          status: 'NEW',
          customerId,
        },
      });
      this.logger.log(`[CHAT_TICKET] Created ticket for conversation ${conversation.id}`);
    }

    // Create inbound message
    const message = await this.prisma.message.create({
      data: {
        organizationId: orgId,
        conversationId: conversation.id,
        direction: MessageDirection.INBOUND,
        body,
        authorType: MessageAuthorType.CUSTOMER,
        authorId: customerId,
        externalMessageId: `chat-${Date.now()}`,
      },
    });

    this.logger.log(`[CHAT_MESSAGE] Created message ${message.id} in conversation ${conversation.id}`);

    // Emit event for AI processing
    this.events.emit('message.inbound', {
      organizationId: orgId,
      ticketId: conversation.ticket?.id || (await this.prisma.ticket.findFirst({
        where: { conversationId: conversation.id },
        select: { id: true },
      }))?.id,
      messageId: message.id,
    });

    return { data: message };
  }

  async getMessages(orgId: string, sessionId: string, since?: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        organizationId: orgId,
        externalThreadId: sessionId,
        channel: Channel.CHAT,
      },
    });

    if (!conversation) {
      return { data: [] };
    }

    const whereClause: any = {
      organizationId: orgId,
      conversationId: conversation.id,
    };

    if (since) {
      const sinceDate = new Date(since);
      whereClause.createdAt = { gt: sinceDate };
    }

    const messages = await this.prisma.message.findMany({
      where: whereClause,
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        body: true,
        direction: true,
        authorType: true,
        createdAt: true,
      },
    });

    return { data: messages };
  }

  async updateSession(orgId: string, sessionId: string, email: string) {
    // Link anonymous session to email-based customer
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        organizationId: orgId,
        externalThreadId: sessionId,
        channel: Channel.CHAT,
      },
    });

    if (!conversation) {
      throw new NotFoundException('Chat session not found');
    }

    // Upsert customer by email
    const customer = await this.prisma.customer.upsert({
      where: {
        organizationId_email: { organizationId: orgId, email },
      },
      create: {
        organizationId: orgId,
        email,
        name: email.split('@')[0],
      },
      update: {},
    });

    // Update conversation to link to this customer
    await this.prisma.conversation.update({
      where: { id: conversation.id },
      data: { customerId: customer.id },
    });

    // Update all messages to have this customer as author
    await this.prisma.message.updateMany({
      where: { conversationId: conversation.id },
      data: { authorId: customer.id },
    });

    this.logger.log(`[CHAT_EMAIL_LINK] Linked session ${sessionId} to email ${email}`);

    return { ok: true };
  }
}
