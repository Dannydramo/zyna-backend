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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_org_decorator_1 = require("../../common/decorators/current-org.decorator");
const sla_service_1 = require("./sla.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let SlaController = class SlaController {
    constructor(slaService, prisma) {
        this.slaService = slaService;
        this.prisma = prisma;
    }
    async metrics(orgId) {
        const [breachedCount, warningCount, okCount, totalTickets, breaches] = await this.prisma.$transaction([
            this.prisma.ticket.count({
                where: { organizationId: orgId, deletedAt: null, slaState: 'BREACHED' },
            }),
            this.prisma.ticket.count({
                where: { organizationId: orgId, deletedAt: null, slaState: 'WARNING' },
            }),
            this.prisma.ticket.count({
                where: { organizationId: orgId, deletedAt: null, slaState: 'OK' },
            }),
            this.prisma.ticket.count({
                where: { organizationId: orgId, deletedAt: null },
            }),
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
    calculateBreachTime(dueAt) {
        if (!dueAt)
            return 'N/A';
        const now = new Date();
        const diff = now.getTime() - dueAt.getTime();
        const minutes = Math.round(diff / 60_000);
        if (minutes < 60)
            return `${minutes}m`;
        if (minutes < 1440)
            return `${Math.round(minutes / 60)}h`;
        return `${Math.round(minutes / 1440)}d`;
    }
};
exports.SlaController = SlaController;
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get SLA metrics for the organization' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SlaController.prototype, "metrics", null);
exports.SlaController = SlaController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('sla'),
    (0, common_1.Controller)('sla'),
    __metadata("design:paramtypes", [sla_service_1.SlaService,
        prisma_service_1.PrismaService])
], SlaController);
//# sourceMappingURL=sla.controller.js.map