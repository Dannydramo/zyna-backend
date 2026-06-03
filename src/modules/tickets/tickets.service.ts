import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';
import {
  AuditActorType,
  MessageAuthorType,
  MessageDirection,
  TicketPriority,
  TicketStatus,
} from '../../generated/prisma/enums';
import type { PaginatedResponse } from '../../common/dto/pagination.dto';
import type { ListTicketsDto } from './dto/list-tickets.dto';
import type { CreateTicketDto } from './dto/create-ticket.dto';
import type { UpdateTicketDto } from './dto/update-ticket.dto';
import type { TransitionTicketDto } from './dto/transition-ticket.dto';
import type { AssignTicketDto } from './dto/assign-ticket.dto';
import type { RequestUser } from '../../common/decorators/current-user.decorator';

const TICKET_INCLUDE = {
  customer: {
    select: { id: true, name: true, email: true, avatarUrl: true },
  },
  assignee: { select: { id: true, name: true } },
} as const;

const TICKET_FULL_INCLUDE = {
  ...TICKET_INCLUDE,
  conversation: {
    include: {
      messages: { orderBy: { createdAt: 'asc' as const } },
    },
  },
  aiSuggestions: { orderBy: { createdAt: 'desc' as const }, take: 1 },
} as const;

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventEmitter2,
  ) {}

  // ── List ──────────────────────────────────────────────────────────────────

  async findAll(
    orgId: string,
    user: RequestUser,
    query: ListTicketsDto,
  ): Promise<PaginatedResponse<unknown>> {
    const {
      page = 1,
      limit = 20,
      tab = 'all',
      status,
      channel,
      priority,
      assigneeId,
      aiStatus,
      q,
    } = query;
    const skip = (page - 1) * limit;

    // Build base where clause
    // Admins see all organizations' tickets, non-admins see only their org
    const where: any = {
      deletedAt: null,
    };

    if (user.role !== 'ADMIN') {
      where.organizationId = orgId;
    }

    // Apply tab filters
    switch (tab) {
      case 'assigned':
        where.assigneeId = { not: null };
        break;
      case 'unassigned':
        where.assigneeId = null;
        break;
      case 'ai-handled':
        where.aiStatus = { not: 'NONE' };
        break;
      case 'all':
      default:
        where.OR = [
          { status: TicketStatus.NEW },
          { status: TicketStatus.OPEN },
          { status: TicketStatus.PENDING },
        ];
        break;
    }

    // Apply additional filters
    if (status) where.status = status;
    if (channel) where.channel = channel;
    if (priority) where.priority = priority;
    if (assigneeId) where.assigneeId = assigneeId;
    if (aiStatus && aiStatus !== 'NONE') where.aiStatus = aiStatus;

    // Apply search
    if (q) {
      where.OR = [
        ...(where.OR || []),
        { subject: { contains: q, mode: 'insensitive' as const } },
        { customer: { name: { contains: q, mode: 'insensitive' as const } } },
        { customer: { email: { contains: q, mode: 'insensitive' as const } } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.ticket.findMany({
        where,
        skip,
        take: limit,
        include: TICKET_INCLUDE,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.ticket.count({ where }),
    ]);

    return { data, meta: { page, limit, total } };
  }

  // ── Single ────────────────────────────────────────────────────────────────

  async findOne(orgId: string, id: string): Promise<{ data: unknown }> {
    const ticket = await this.prisma.ticket.findFirst({
      where: { id, organizationId: orgId, deletedAt: null },
      include: TICKET_FULL_INCLUDE,
    });
    if (!ticket) throw new NotFoundException(`Ticket ${id} not found`);
    return { data: ticket };
  }

  // ── Create ────────────────────────────────────────────────────────────────

  async create(
    orgId: string,
    dto: CreateTicketDto,
  ): Promise<{ data: unknown }> {
    // 1. Upsert customer
    const customer = await this.prisma.customer.upsert({
      where: {
        organizationId_email: {
          organizationId: orgId,
          email: dto.customerEmail,
        },
      },
      create: {
        organizationId: orgId,
        name: dto.customerName,
        email: dto.customerEmail,
      },
      update: {},
    });

    // 2. Create conversation
    const conversation = await this.prisma.conversation.create({
      data: {
        organizationId: orgId,
        customerId: customer.id,
        channel: dto.channel,
      },
    });

    // 3. Create first inbound message
    const message = await this.prisma.message.create({
      data: {
        organizationId: orgId,
        conversationId: conversation.id,
        direction: MessageDirection.INBOUND,
        body: dto.firstMessage,
        authorType: MessageAuthorType.CUSTOMER,
        authorId: customer.id,
      },
    });

    // 4. Create ticket
    const ticket = await this.prisma.ticket.create({
      data: {
        organizationId: orgId,
        conversationId: conversation.id,
        customerId: customer.id,
        subject: dto.subject,
        channel: dto.channel,
        priority: dto.priority ?? TicketPriority.NORMAL,
        tags: dto.tags ?? [],
      },
      include: TICKET_INCLUDE,
    });

    // 5. Write audit
    await this.writeAudit(orgId, 'CREATE', 'Ticket', ticket.id, {
      subject: ticket.subject,
    });
    this.events.emit('message.inbound', {
      organizationId: orgId,
      ticketId: ticket.id,
      messageId: message.id,
    });

    return { data: ticket };
  }

  // ── Update ────────────────────────────────────────────────────────────────

  async update(
    orgId: string,
    id: string,
    dto: UpdateTicketDto,
  ): Promise<{ data: unknown }> {
    const ticket = await this.findOrThrow(orgId, id);

    const data = {
      ...(dto.priority !== undefined && {
        priority: dto.priority,
      }),
      ...(dto.tags !== undefined && { tags: dto.tags }),
      ...(dto.assigneeId !== undefined && { assigneeId: dto.assigneeId }),
      ...(dto.aiStatus !== undefined && { aiStatus: dto.aiStatus }),
    };

    const statusData =
      dto.status !== undefined
        ? this.getStatusUpdate(ticket.status, dto.status)
        : {};

    const updated = await this.prisma.ticket.update({
      where: { id },
      data: { ...data, ...statusData },
      include: TICKET_INCLUDE,
    });

    await this.writeAudit(
      orgId,
      'UPDATE',
      'Ticket',
      id,
      dto as Record<string, unknown>,
    );

    return { data: updated };
  }

  async transition(
    orgId: string,
    id: string,
    dto: TransitionTicketDto,
  ): Promise<{ data: unknown }> {
    const ticket = await this.findOrThrow(orgId, id);
    const updated = await this.prisma.ticket.update({
      where: { id },
      data: this.getStatusUpdate(ticket.status, dto.status),
      include: TICKET_INCLUDE,
    });

    await this.writeAudit(orgId, 'TRANSITION', 'Ticket', id, {
      from: ticket.status,
      to: dto.status,
      reason: dto.reason,
    });

    return { data: updated };
  }

  // ── Assign ────────────────────────────────────────────────────────────────

  async assign(
    orgId: string,
    id: string,
    dto: AssignTicketDto,
    user: RequestUser,
  ): Promise<{ data: unknown }> {
    const ticket = await this.findOrThrow(orgId, id);

    // Update the ticket with new assignee (empty string becomes null for unassign)
    const updated = await this.prisma.ticket.update({
      where: { id },
      data: { assigneeId: dto.assigneeId || null },
      include: TICKET_INCLUDE,
    });

    // Log the assignment action
    await this.writeAudit(orgId, 'ASSIGN', 'Ticket', id, {
      assignedTo: dto.assigneeId || null,
      previousAssignee: ticket.assigneeId,
      reason: dto.reason || null,
      assignedBy: user.sub,
    });

    return { data: updated };
  }

  // ── Delete (soft) ─────────────────────────────────────────────────────────

  async remove(
    orgId: string,
    id: string,
  ): Promise<{ data: { message: string } }> {
    await this.findOrThrow(orgId, id);

    await this.prisma.ticket.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await this.writeAudit(orgId, 'DELETE', 'Ticket', id, {});

    return { data: { message: 'Ticket deleted' } };
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private async findOrThrow(orgId: string, id: string) {
    const ticket = await this.prisma.ticket.findFirst({
      where: { id, organizationId: orgId, deletedAt: null },
    });
    if (!ticket) throw new NotFoundException(`Ticket ${id} not found`);
    return ticket;
  }

  private getStatusUpdate(current: TicketStatus, next: TicketStatus) {
    if (current === next) return { status: next };

    const allowed: Record<TicketStatus, TicketStatus[]> = {
      [TicketStatus.NEW]: [TicketStatus.OPEN],
      [TicketStatus.OPEN]: [TicketStatus.PENDING, TicketStatus.SOLVED],
      [TicketStatus.PENDING]: [TicketStatus.OPEN],
      [TicketStatus.SOLVED]: [TicketStatus.CLOSED, TicketStatus.OPEN],
      [TicketStatus.CLOSED]: [],
    };

    if (!allowed[current].includes(next)) {
      throw new BadRequestException(
        `Invalid ticket transition ${current} -> ${next}`,
      );
    }

    return {
      status: next,
      ...(next === TicketStatus.SOLVED && { solvedAt: new Date() }),
      ...(next === TicketStatus.OPEN &&
        current === TicketStatus.SOLVED && { solvedAt: null }),
    };
  }

  private async writeAudit(
    orgId: string,
    action: string,
    entityType: string,
    entityId: string,
    metadata: Record<string, unknown>,
  ): Promise<void> {
    await this.prisma.auditRecord.create({
      data: {
        organizationId: orgId,
        actorType: AuditActorType.SYSTEM,
        // TODO (Phase 5): replace SYSTEM with authenticated user ID from JWT
        actorId: null,
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
