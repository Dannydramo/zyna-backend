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
exports.SlaService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../../prisma/prisma.service");
let SlaService = class SlaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recomputeAll() {
        const tickets = await this.prisma.ticket.findMany({
            where: {
                deletedAt: null,
                status: { notIn: [enums_1.TicketStatus.SOLVED, enums_1.TicketStatus.CLOSED] },
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
    async recomputeTicket(orgId, ticketId) {
        const ticket = await this.prisma.ticket.findFirst({
            where: { id: ticketId, organizationId: orgId },
        });
        if (!ticket)
            return null;
        const policy = await this.getDefaultPolicy(orgId);
        const firstResponseDueAt = ticket.firstResponseDueAt ??
            new Date(ticket.createdAt.getTime() + policy.firstResponseMinutes * 60_000);
        const resolutionDueAt = ticket.resolutionDueAt ??
            new Date(ticket.createdAt.getTime() + policy.resolutionMinutes * 60_000);
        const slaState = this.computeState(ticket, firstResponseDueAt, resolutionDueAt);
        return this.prisma.ticket.update({
            where: { id: ticketId },
            data: { firstResponseDueAt, resolutionDueAt, slaState },
        });
    }
    async getDefaultPolicy(orgId) {
        const existing = await this.prisma.slaPolicy.findFirst({
            where: { organizationId: orgId },
            orderBy: { createdAt: 'asc' },
        });
        if (existing)
            return existing;
        return this.prisma.slaPolicy.create({
            data: {
                organizationId: orgId,
                name: 'Default support SLA',
                firstResponseMinutes: 60,
                resolutionMinutes: 1440,
            },
        });
    }
    computeState(ticket, firstResponseDueAt, resolutionDueAt) {
        if (ticket.status === enums_1.TicketStatus.SOLVED ||
            ticket.status === enums_1.TicketStatus.CLOSED)
            return enums_1.SlaState.OK;
        const now = Date.now();
        const warningWindowMs = 30 * 60_000;
        const firstResponseBreached = !ticket.firstResponseAt && now > firstResponseDueAt.getTime();
        const resolutionBreached = !ticket.solvedAt && now > resolutionDueAt.getTime();
        if (firstResponseBreached || resolutionBreached)
            return enums_1.SlaState.BREACHED;
        const firstResponseWarning = !ticket.firstResponseAt &&
            firstResponseDueAt.getTime() - now <= warningWindowMs;
        const resolutionWarning = !ticket.solvedAt && resolutionDueAt.getTime() - now <= warningWindowMs;
        return firstResponseWarning || resolutionWarning
            ? enums_1.SlaState.WARNING
            : enums_1.SlaState.OK;
    }
};
exports.SlaService = SlaService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SlaService.prototype, "recomputeAll", null);
exports.SlaService = SlaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SlaService);
//# sourceMappingURL=sla.service.js.map