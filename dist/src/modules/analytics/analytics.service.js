"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async overview(orgId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [openTicketCount, resolvedToday, totalTickets, aiResolved, tickets] = await this.prisma.$transaction([
            this.prisma.ticket.count({
                where: {
                    organizationId: orgId,
                    deletedAt: null,
                    status: {
                        in: [enums_1.TicketStatus.NEW, enums_1.TicketStatus.OPEN, enums_1.TicketStatus.PENDING],
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
                    aiStatus: enums_1.AiStatus.RESOLVED,
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
            .map((ticket) => Number(ticket.firstResponseAt) - Number(ticket.createdAt));
        const avgFirstResponseMinutes = responseTimes.length
            ? Math.round(responseTimes.reduce((sum, value) => sum + value, 0) /
                responseTimes.length /
                60_000)
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
                topIntents: this.countBy(tickets.map((ticket) => ticket.intent ?? 'unknown')),
            },
        };
    }
    timeSeries(tickets) {
        const buckets = new Map();
        for (let offset = 6; offset >= 0; offset--) {
            const day = new Date();
            day.setDate(day.getDate() - offset);
            const key = day.toISOString().slice(0, 10);
            buckets.set(key, 0);
        }
        for (const ticket of tickets) {
            const key = ticket.createdAt.toISOString().slice(0, 10);
            if (buckets.has(key))
                buckets.set(key, (buckets.get(key) ?? 0) + 1);
        }
        return Array.from(buckets.entries()).map(([date, count]) => ({
            date,
            count,
        }));
    }
    countBy(values) {
        const counts = values.reduce((acc, value) => {
            acc[value] = (acc[value] ?? 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts)
            .map(([key, count]) => ({ key, count }))
            .sort((left, right) => right.count - left.count);
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map