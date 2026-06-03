import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
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
}
