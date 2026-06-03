import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  AuditActorType,
  Channel,
  MessageAuthorType,
  MessageDirection,
  TicketStatus,
} from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import { IngestionService } from '../ingestion/ingestion.service';
import type { RequestUser } from '../../common/decorators/current-user.decorator';
import type { CreateMessageDto } from './dto/create-message.dto';

export interface InboundMessageEvent {
  organizationId: string;
  ticketId: string;
  messageId: string;
}

@Injectable()
export class ConversationsService {
  private readonly logger = new Logger(ConversationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventEmitter2,
    private readonly ingestion: IngestionService,
    private readonly config: ConfigService,
  ) {}

  async findTicketMessages(orgId: string, ticketId: string) {
    const ticket = await this.findTicket(orgId, ticketId);
    const messages = await this.prisma.message.findMany({
      where: { organizationId: orgId, conversationId: ticket.conversationId },
      orderBy: { createdAt: 'asc' },
    });
    return { data: messages };
  }

  async createAgentReply(
    orgId: string,
    ticketId: string,
    dto: CreateMessageDto,
    user: RequestUser,
  ) {
    this.logger.log(`[REPLY_START] Agent creating reply for ticket ${ticketId}`);
    this.logger.log(`[REPLY_USER] User ${user.sub} replying`);
    this.logger.log(`[REPLY_BODY] Message length: ${dto.body.length} chars`);

    const ticket = await this.prisma.ticket.findFirst({
      where: { id: ticketId, organizationId: orgId, deletedAt: null },
      include: { customer: true, conversation: true },
    });

    if (!ticket) {
      this.logger.error(`[REPLY_ERROR] Ticket ${ticketId} not found`);
      throw new NotFoundException(`Ticket ${ticketId} not found`);
    }

    if (ticket.status === TicketStatus.CLOSED) {
      this.logger.warn(`[REPLY_ERROR] Ticket ${ticketId} is closed`);
      throw new BadRequestException('Cannot reply to a closed ticket');
    }

    this.logger.log(`[REPLY_TICKET] Ticket found: ${ticket.subject}, Channel: ${ticket.channel}`);
    this.logger.log(`[REPLY_CUSTOMER] Customer: ${ticket.customer?.name} <${ticket.customer?.email}>`);

    const now = new Date();

    // Create OUTBOUND message in database
    this.logger.log(`[OUTBOUND_MSG_START] Creating outbound message in DB...`);
    const message = await this.prisma.message.create({
      data: {
        organizationId: orgId,
        conversationId: ticket.conversationId,
        direction: MessageDirection.OUTBOUND,
        body: dto.body,
        authorType: MessageAuthorType.AGENT,
        authorId: dto.authorId ?? user.sub,
      },
    });
    this.logger.log(`[OUTBOUND_MSG_CREATED] Message ${message.id} created in DB`);
    this.logger.log(`   - Direction: ${message.direction}`);
    this.logger.log(`   - Author Type: ${message.authorType}`);
    this.logger.log(`   - Author ID: ${message.authorId}`);

    // Send email reply if this is an EMAIL channel
    if (ticket.channel === Channel.EMAIL && ticket.customer?.email) {
      this.logger.log(`[EMAIL_REPLY_START] Channel is EMAIL, sending reply to ${ticket.customer.email}`);
      try {
        // Get the channel connection to find SMTP and from address
        const channelConnection = await this.prisma.channelConnection.findFirst({
          where: {
            organizationId: orgId,
            channel: Channel.EMAIL,
            status: 'ACTIVE',
          },
        });

        if (!channelConnection) {
          this.logger.warn(`[EMAIL_SKIP] No active email channel found for org`);
        } else {
          const cfg = channelConnection.config as any;
          const fromEmail = cfg?.inboundRoutingAddress || cfg?.fromAddress || 'support@example.com';
          const smtpConfig = {
            host: cfg?.smtpHost,
            port: cfg?.smtpPort,
            secure: cfg?.smtpSecure,
            user: cfg?.smtpUser,
            pass: cfg?.smtpPass,
          };

          this.logger.log(`[SMTP_CONFIG] Using SMTP from channel config`);
          this.logger.log(`   Host: ${smtpConfig.host}`);
          this.logger.log(`   Port: ${smtpConfig.port}`);
          this.logger.log(`   Secure: ${smtpConfig.secure}`);
          this.logger.log(`   User: ${smtpConfig.user}`);

          const emailPayload = {
            to: ticket.customer.email,
            from: fromEmail,
            subject: `Re: ${ticket.subject}`,
            body: dto.body,
            smtpConfig,
            ...(ticket.conversation?.externalThreadId && {
              inReplyTo: ticket.conversation.externalThreadId,
            }),
          };
          this.logger.log(`[EMAIL_PAYLOAD] From: ${emailPayload.from}`);
          this.logger.log(`[EMAIL_PAYLOAD] To: ${emailPayload.to}`);
          this.logger.log(`[EMAIL_PAYLOAD] Subject: ${emailPayload.subject}`);
          this.logger.log(`[EMAIL_PAYLOAD] InReplyTo: ${(emailPayload as any).inReplyTo || 'none'}`);

          await this.ingestion.sendEmail(emailPayload as any);
          this.logger.log(`✅ [EMAIL_SENT] Reply email sent from ${fromEmail} to ${ticket.customer.email}`);
        }
      } catch (err) {
        this.logger.error(
          `❌ [EMAIL_FAILED] Failed to send email: ${err instanceof Error ? err.message : String(err)}`,
        );
        this.logger.error(`[EMAIL_STACK] ${err instanceof Error ? err.stack : 'No stack'}`);
        // Don't throw - message is still created even if email send fails
      }
    } else {
      if (ticket.channel !== Channel.EMAIL) {
        this.logger.log(`[EMAIL_SKIP] Channel is ${ticket.channel}, not EMAIL`);
      }
      if (!ticket.customer?.email) {
        this.logger.log(`[EMAIL_SKIP] No customer email address`);
      }
    }

    // For CHAT channel, message is saved to DB and widget polls for it (no external send)
    if (ticket.channel === Channel.CHAT) {
      this.logger.log(`[CHAT_REPLY] Chat message saved to DB, widget will poll for it`);
    }

    // Update ticket status
    this.logger.log(`[TICKET_UPDATE_START] Updating ticket status and firstResponseAt...`);
    await this.prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        firstResponseAt: ticket.firstResponseAt ?? now,
        ...(ticket.status === TicketStatus.NEW && {
          status: TicketStatus.OPEN,
        }),
      },
    });
    this.logger.log(`✅ [TICKET_UPDATED] Ticket status updated`);

    // Write audit log
    await this.writeAudit(orgId, user.sub, 'REPLY', 'Message', message.id, {
      ticketId,
    });
    this.logger.log(`✅ [AUDIT_LOGGED] Audit record created`);
    this.logger.log(`[REPLY_COMPLETE] Reply process finished for ticket ${ticketId}\n`);

    return { data: message };
  }

  async createInboundMessage(
    orgId: string,
    ticketId: string,
    body: string,
    customerId: string,
    externalMessageId?: string,
    headers: Record<string, unknown> = {},
  ) {
    const ticket = await this.findTicket(orgId, ticketId);
    const message = await this.prisma.message.create({
      data: {
        organizationId: orgId,
        conversationId: ticket.conversationId,
        direction: MessageDirection.INBOUND,
        body,
        authorType: MessageAuthorType.CUSTOMER,
        authorId: customerId,
        externalMessageId,
        headers: headers as unknown as Parameters<
          typeof this.prisma.message.create
        >[0]['data']['headers'],
      },
    });
    this.events.emit('message.inbound', {
      organizationId: orgId,
      ticketId,
      messageId: message.id,
    });
    return message;
  }

  private async findTicket(orgId: string, ticketId: string) {
    const ticket = await this.prisma.ticket.findFirst({
      where: { id: ticketId, organizationId: orgId, deletedAt: null },
    });
    if (!ticket) throw new NotFoundException(`Ticket ${ticketId} not found`);
    if (ticket.status === TicketStatus.CLOSED) {
      throw new BadRequestException('Cannot reply to a closed ticket');
    }
    return ticket;
  }

  private async writeAudit(
    orgId: string,
    actorId: string,
    action: string,
    entityType: string,
    entityId: string,
    metadata: Record<string, unknown>,
  ) {
    await this.prisma.auditRecord.create({
      data: {
        organizationId: orgId,
        actorType: AuditActorType.USER,
        actorId,
        action,
        entityType,
        entityId,
        metadata: metadata as unknown as Parameters<
          typeof this.prisma.auditRecord.create
        >[0]['data']['metadata'],
      },
    });
  }
}
