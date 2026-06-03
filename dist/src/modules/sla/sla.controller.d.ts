import { SlaService } from './sla.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class SlaController {
    private readonly slaService;
    private readonly prisma;
    constructor(slaService: SlaService, prisma: PrismaService);
    metrics(orgId: string): Promise<{
        data: {
            metrics: {
                name: string;
                current: string;
                target: string;
                trend: string;
                compliance: number;
            }[];
            summary: {
                totalTickets: number;
                breached: number;
                warning: number;
                ok: number;
            };
            recentBreaches: {
                id: string;
                ticketId: string;
                customer: string;
                subject: string;
                sla: string;
                impact: string;
                breachTime: string;
                breachedAt: Date | null;
            }[];
        };
    }>;
    private calculateBreachTime;
}
