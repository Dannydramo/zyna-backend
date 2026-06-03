import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../common/decorators/current-org.decorator';
import { SlaService } from './sla.service';
import { PrismaService } from '../../prisma/prisma.service';

@ApiBearerAuth()
@ApiTags('sla')
@Controller('sla')
export class SlaController {
  constructor(
    private readonly slaService: SlaService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Get SLA metrics for the organization' })
  async metrics(@CurrentOrg() orgId: string) {
    const [breachedCount, warningCount, okCount, totalTickets, breaches] =
      await this.prisma.$transaction([
        // Breached tickets
        this.prisma.ticket.count({
          where: { organizationId: orgId, deletedAt: null, slaState: 'BREACHED' },
        }),
        // Warning tickets
        this.prisma.ticket.count({
          where: { organizationId: orgId, deletedAt: null, slaState: 'WARNING' },
        }),
        // OK tickets
        this.prisma.ticket.count({
          where: { organizationId: orgId, deletedAt: null, slaState: 'OK' },
        }),
        // Total tickets
        this.prisma.ticket.count({
          where: { organizationId: orgId, deletedAt: null },
        }),
        // Recent breaches with details
        this.prisma.ticket.findMany({
          where: {
            organizationId: orgId,
            deletedAt: null,
            slaState: 'BREACHED',
          },
          select: {
            id: true,
            subject: true,
            customer: { select: { name: true } },
            firstResponseDueAt: true,
            resolutionDueAt: true,
            firstResponseAt: true,
            solvedAt: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        }),
      ]);

    const complianceRate = totalTickets
      ? Math.round(((okCount + breachedCount + warningCount) / totalTickets) * 100)
      : 100;

    return {
      data: {
        metrics: [
          {
            name: 'First Response',
            current: '95%',
            target: '95%',
            trend: 'up',
            compliance: 95,
          },
          {
            name: 'Resolution',
            current: '90%',
            target: '90%',
            trend: 'up',
            compliance: 90,
          },
          {
            name: 'Overall Compliance',
            current: `${complianceRate}%`,
            target: '95%',
            trend: complianceRate >= 95 ? 'up' : 'down',
            compliance: complianceRate,
          },
        ],
        summary: {
          totalTickets,
          breached: breachedCount,
          warning: warningCount,
          ok: okCount,
        },
        recentBreaches: breaches.map((breach) => ({
          id: breach.id,
          ticketId: breach.id,
          customer: breach.customer?.name || 'Unknown',
          subject: breach.subject,
          sla: 'First Response',
          impact: 'High',
          breachTime: this.calculateBreachTime(breach.firstResponseDueAt),
          breachedAt: breach.firstResponseDueAt,
        })),
      },
    };
  }

  private calculateBreachTime(dueAt: Date | null): string {
    if (!dueAt) return 'N/A';
    const now = new Date();
    const diff = now.getTime() - dueAt.getTime();
    const minutes = Math.round(diff / 60_000);

    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h`;
    return `${Math.round(minutes / 1440)}d`;
  }
}
