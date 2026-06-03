import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SlaState, TicketStatus } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SlaService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async recomputeAll() {
    const tickets = await this.prisma.ticket.findMany({
      where: {
        deletedAt: null,
        status: { notIn: [TicketStatus.SOLVED, TicketStatus.CLOSED] },
      },
      select: {
        id: true,
        organizationId: true,
        createdAt: true,
        firstResponseAt: true,
        solvedAt: true,
      },
    });
    for (const ticket of tickets) {
      await this.recomputeTicket(ticket.organizationId, ticket.id);
    }
  }

  async recomputeTicket(orgId: string, ticketId: string) {
    const ticket = await this.prisma.ticket.findFirst({
      where: { id: ticketId, organizationId: orgId },
    });
    if (!ticket) return null;

    const policy = await this.getDefaultPolicy(orgId);
    const firstResponseDueAt =
      ticket.firstResponseDueAt ??
      new Date(
        ticket.createdAt.getTime() + policy.firstResponseMinutes * 60_000,
      );
    const resolutionDueAt =
      ticket.resolutionDueAt ??
      new Date(ticket.createdAt.getTime() + policy.resolutionMinutes * 60_000);
    const slaState = this.computeState(
      ticket,
      firstResponseDueAt,
      resolutionDueAt,
    );

    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: { firstResponseDueAt, resolutionDueAt, slaState },
    });
  }

  async getDefaultPolicy(orgId: string) {
    const existing = await this.prisma.slaPolicy.findFirst({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'asc' },
    });
    if (existing) return existing;
    return this.prisma.slaPolicy.create({
      data: {
        organizationId: orgId,
        name: 'Default support SLA',
        firstResponseMinutes: 60,
        resolutionMinutes: 1440,
      },
    });
  }

  private computeState(
    ticket: {
      firstResponseAt: Date | null;
      solvedAt: Date | null;
      status: TicketStatus;
    },
    firstResponseDueAt: Date,
    resolutionDueAt: Date,
  ) {
    if (
      ticket.status === TicketStatus.SOLVED ||
      ticket.status === TicketStatus.CLOSED
    )
      return SlaState.OK;
    const now = Date.now();
    const warningWindowMs = 30 * 60_000;
    const firstResponseBreached =
      !ticket.firstResponseAt && now > firstResponseDueAt.getTime();
    const resolutionBreached =
      !ticket.solvedAt && now > resolutionDueAt.getTime();
    if (firstResponseBreached || resolutionBreached) return SlaState.BREACHED;
    const firstResponseWarning =
      !ticket.firstResponseAt &&
      firstResponseDueAt.getTime() - now <= warningWindowMs;
    const resolutionWarning =
      !ticket.solvedAt && resolutionDueAt.getTime() - now <= warningWindowMs;
    return firstResponseWarning || resolutionWarning
      ? SlaState.WARNING
      : SlaState.OK;
  }
}
