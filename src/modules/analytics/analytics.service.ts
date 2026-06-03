import { Injectable } from '@nestjs/common';
import { AiStatus, TicketStatus } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(orgId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [openTicketCount, resolvedToday, totalTickets, aiResolved, tickets] =
      await this.prisma.$transaction([
        this.prisma.ticket.count({
          where: {
            organizationId: orgId,
            deletedAt: null,
            status: {
              in: [TicketStatus.NEW, TicketStatus.OPEN, TicketStatus.PENDING],
            },
          },
        }),
        this.prisma.ticket.count({
          where: {
            organizationId: orgId,
            deletedAt: null,
            solvedAt: { gte: today },
          },
        }),
        this.prisma.ticket.count({
          where: { organizationId: orgId, deletedAt: null },
        }),
        this.prisma.ticket.count({
          where: {
            organizationId: orgId,
            deletedAt: null,
            aiStatus: AiStatus.RESOLVED,
          },
        }),
        this.prisma.ticket.findMany({
          where: { organizationId: orgId, deletedAt: null },
          select: {
            createdAt: true,
            channel: true,
            intent: true,
            firstResponseAt: true,
          },
        }),
      ]);

    const responseTimes = tickets
      .filter((ticket) => ticket.firstResponseAt)
      .map(
        (ticket) => Number(ticket.firstResponseAt) - Number(ticket.createdAt),
      );
    const avgFirstResponseMinutes = responseTimes.length
      ? Math.round(
          responseTimes.reduce((sum, value) => sum + value, 0) /
            responseTimes.length /
            60_000,
        )
      : null;

    return {
      data: {
        openTicketCount,
        avgFirstResponseMinutes,
        resolvedToday,
        aiResolutionRate: totalTickets
          ? Math.round((aiResolved / totalTickets) * 100)
          : 0,
        csat: null,
        timeSeries: this.timeSeries(tickets),
        channelBreakdown: this.countBy(tickets.map((ticket) => ticket.channel)),
        topIntents: this.countBy(
          tickets.map((ticket) => ticket.intent ?? 'unknown'),
        ),
      },
    };
  }

  private timeSeries(tickets: { createdAt: Date }[]) {
    const buckets = new Map<string, number>();
    for (let offset = 6; offset >= 0; offset--) {
      const day = new Date();
      day.setDate(day.getDate() - offset);
      const key = day.toISOString().slice(0, 10);
      buckets.set(key, 0);
    }
    for (const ticket of tickets) {
      const key = ticket.createdAt.toISOString().slice(0, 10);
      if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
    return Array.from(buckets.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  }

  private countBy(values: string[]) {
    const counts = values.reduce<Record<string, number>>((acc, value) => {
      acc[value] = (acc[value] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([key, count]) => ({ key, count }))
      .sort((left, right) => right.count - left.count);
  }
}
