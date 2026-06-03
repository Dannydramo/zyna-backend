import { PrismaService } from '../../prisma/prisma.service';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    overview(orgId: string): Promise<{
        data: {
            openTicketCount: number;
            avgFirstResponseMinutes: number | null;
            resolvedToday: number;
            aiResolutionRate: number;
            csat: null;
            timeSeries: {
                date: string;
                count: number;
            }[];
            channelBreakdown: {
                key: string;
                count: number;
            }[];
            topIntents: {
                key: string;
                count: number;
            }[];
        };
    }>;
    private timeSeries;
    private countBy;
}
