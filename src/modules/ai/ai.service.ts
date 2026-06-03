import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  AiStatus,
  AuditActorType,
  Channel,
  MessageAuthorType,
  MessageDirection,
} from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { IngestionService } from '../ingestion/ingestion.service';
import type { InboundMessageEvent } from '../conversations/conversations.service';
import { LlmProvider } from './llm/llm-provider';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly knowledge: KnowledgeService,
    private readonly llm: LlmProvider,
    private readonly ingestion: IngestionService,
  ) {}

  @OnEvent('message.inbound')
  async handleInboundMessage(event: InboundMessageEvent) {
    await this.suggest(event.organizationId, event.ticketId, event.messageId);
  }

  async getSuggestion(orgId: string, ticketId: string) {
    const ticket = await this.prisma.ticket.findFirst({
      where: { id: ticketId, organizationId: orgId, deletedAt: null },
    });
    if (!ticket) throw new NotFoundException(`Ticket ${ticketId} not found`);

    const suggestion = await this.prisma.aiSuggestion.findFirst({
      where: {
        organizationId: orgId,
        ticketId,
        rejectedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });

    return { data: suggestion };
  }

  async suggest(orgId: string, ticketId: string, messageId?: string) {
    const ticket = await this.prisma.ticket.findFirst({
      where: { id: ticketId, organizationId: orgId, deletedAt: null },
      include: {
        conversation: {
          include: {
            messages: { orderBy: { createdAt: 'desc' }, take: 1 },
          },
        },
      },
    });
    if (!ticket) throw new NotFoundException(`Ticket ${ticketId} not found`);

    const message =
      (messageId &&
        (await this.prisma.message.findFirst({
          where: {
            id: messageId,
            organizationId: orgId,
            conversationId: ticket.conversationId,
          },
        }))) ??
      ticket.conversation.messages[0];
    if (!message)
      throw new BadRequestException('Ticket has no message to analyze');

    const articles = await this.knowledge.retrieve(
      orgId,
      `${ticket.subject} ${message.body}`,
      3,
    );
    const suggestion = await this.llm.generateSuggestion({
      subject: ticket.subject,
      message: message.body,
      articles: articles.map((article) => ({
        id: article.id,
        title: article.title,
        body: article.body,
      })),
    });
    if (!suggestion.citations.length) {
      throw new BadRequestException(
        'AI suggestions require at least one citation',
      );
    }

    const record = await this.prisma.aiSuggestion.create({
      data: {
        organizationId: orgId,
        ticketId,
        messageId: message.id,
        intent: suggestion.intent,
        draft: suggestion.draft,
        citations: suggestion.citations,
        confidence: suggestion.confidence,
      },
    });

    await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { aiStatus: AiStatus.SUGGESTED, intent: suggestion.intent },
    });

    await this.audit(orgId, 'AI_SUGGEST', 'AiSuggestion', record.id, {
      ticketId,
      messageId: message.id,
      citations: suggestion.citations,
      confidence: suggestion.confidence,
      intent: suggestion.intent,
    });

    return { data: record };
  }

  async accept(orgId: string, ticketId: string, suggestionId?: string) {
    const suggestion = await this.prisma.aiSuggestion.findFirst({
      where: {
        organizationId: orgId,
        ticketId,
        ...(suggestionId && { id: suggestionId }),
        rejectedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
    if (!suggestion) throw new NotFoundException('AI suggestion not found');
    if (
      !Array.isArray(suggestion.citations) ||
      suggestion.citations.length === 0
    ) {
      throw new BadRequestException(
        'Cannot accept a suggestion without citations',
      );
    }

    const ticket = await this.prisma.ticket.findFirst({
      where: { id: ticketId, organizationId: orgId, deletedAt: null },
      include: {
        conversation: true,
        customer: true,
      },
    });
    if (!ticket) throw new NotFoundException(`Ticket ${ticketId} not found`);

    // Build message body with citation links
    let messageBody = suggestion.draft;
    if (Array.isArray(suggestion.citations) && suggestion.citations.length > 0) {
      // Fetch article titles for citations
      const articles = await this.prisma.knowledgeArticle.findMany({
        where: {
          id: { in: suggestion.citations as string[] },
          organizationId: orgId,
        },
        select: { id: true, title: true },
      });

      if (articles.length > 0) {
        // Use a data attribute format that the widget can process
        const articleLinks = articles
          .map((a) => `[${a.title}](article://${a.id})`)
          .join('\n');
        messageBody = `${suggestion.draft}\n\n**Helpful resources:**\n${articleLinks}`;
      }
    }

    const message = await this.prisma.message.create({
      data: {
        organizationId: orgId,
        conversationId: ticket.conversationId,
        direction: MessageDirection.OUTBOUND,
        body: messageBody,
        authorType: MessageAuthorType.AI,
        authorId: suggestion.id,
      },
    });

    await this.prisma.$transaction([
      this.prisma.aiSuggestion.update({
        where: { id: suggestion.id },
        data: { acceptedAt: new Date() },
      }),
      this.prisma.ticket.update({
        where: { id: ticketId },
        data: {
          aiStatus: AiStatus.RESOLVED,
          firstResponseAt: ticket.firstResponseAt ?? new Date(),
        },
      }),
    ]);

    // Send the message via email if this is an EMAIL channel
    if (ticket.channel === Channel.EMAIL && ticket.customer?.email) {
      this.logger.log(`[AI_EMAIL_START] Sending AI response to ${ticket.customer.email}`);
      try {
        // Get the channel connection to find SMTP config
        const channelConnection = await this.prisma.channelConnection.findFirst({
          where: {
            organizationId: orgId,
            channel: Channel.EMAIL,
            status: 'ACTIVE',
          },
        });

        if (!channelConnection) {
          this.logger.warn(`[AI_EMAIL_SKIP] No active email channel found for org`);
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

          const emailPayload = {
            to: ticket.customer.email,
            from: fromEmail,
            subject: `Re: ${ticket.subject}`,
            body: suggestion.draft,
            smtpConfig,
            ...(ticket.conversation?.externalThreadId && {
              inReplyTo: ticket.conversation.externalThreadId,
            }),
          };

          await this.ingestion.sendEmail(emailPayload as any);
          this.logger.log(`✅ [AI_EMAIL_SENT] AI response sent to ${ticket.customer.email}`);
        }
      } catch (error) {
        this.logger.error(
          `❌ [AI_EMAIL_FAILED] Failed to send AI response: ${error instanceof Error ? error.message : String(error)}`,
        );
        // Don't throw - message is still saved in DB
      }
    }

    await this.audit(orgId, 'AI_ACCEPT', 'AiSuggestion', suggestion.id, {
      ticketId,
      messageId: message.id,
    });

    return { data: message };
  }

  async reject(orgId: string, suggestionId: string) {
    const suggestion = await this.prisma.aiSuggestion.findFirst({
      where: {
        id: suggestionId,
        organizationId: orgId,
        rejectedAt: null,
      },
    });

    if (!suggestion) throw new NotFoundException('AI suggestion not found');

    await this.prisma.aiSuggestion.update({
      where: { id: suggestionId },
      data: { rejectedAt: new Date() },
    });

    await this.audit(orgId, 'AI_REJECT', 'AiSuggestion', suggestionId, {});

    return { data: { success: true } };
  }

  private async audit(
    orgId: string,
    action: string,
    entityType: string,
    entityId: string,
    metadata: Record<string, unknown>,
  ) {
    await this.prisma.auditRecord.create({
      data: {
        organizationId: orgId,
        actorType: AuditActorType.AI,
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
