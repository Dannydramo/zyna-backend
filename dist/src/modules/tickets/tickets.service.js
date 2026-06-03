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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const prisma_service_1 = require("../../prisma/prisma.service");
const enums_1 = require("../../generated/prisma/enums");
const TICKET_INCLUDE = {
    customer: {
        select: { id: true, name: true, email: true, avatarUrl: true },
    },
    assignee: { select: { id: true, name: true } },
};
const TICKET_FULL_INCLUDE = {
    ...TICKET_INCLUDE,
    conversation: {
        include: {
            messages: { orderBy: { createdAt: 'asc' } },
        },
    },
    aiSuggestions: { orderBy: { createdAt: 'desc' }, take: 1 },
};
let TicketsService = class TicketsService {
    constructor(prisma, events) {
        this.prisma = prisma;
        this.events = events;
    }
    async findAll(orgId, user, query) {
        const { page = 1, limit = 20, tab = 'all', status, channel, priority, assigneeId, aiStatus, q, } = query;
        const skip = (page - 1) * limit;
        const where = {
            deletedAt: null,
        };
        if (user.role !== 'ADMIN') {
            where.organizationId = orgId;
        }
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
                    { status: enums_1.TicketStatus.NEW },
                    { status: enums_1.TicketStatus.OPEN },
                    { status: enums_1.TicketStatus.PENDING },
                ];
                break;
        }
        if (status)
            where.status = status;
        if (channel)
            where.channel = channel;
        if (priority)
            where.priority = priority;
        if (assigneeId)
            where.assigneeId = assigneeId;
        if (aiStatus && aiStatus !== 'NONE')
            where.aiStatus = aiStatus;
        if (q) {
            where.OR = [
                ...(where.OR || []),
                { subject: { contains: q, mode: 'insensitive' } },
                { customer: { name: { contains: q, mode: 'insensitive' } } },
                { customer: { email: { contains: q, mode: 'insensitive' } } },
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
    async findOne(orgId, id) {
        const ticket = await this.prisma.ticket.findFirst({
            where: { id, organizationId: orgId, deletedAt: null },
            include: TICKET_FULL_INCLUDE,
        });
        if (!ticket)
            throw new common_1.NotFoundException(`Ticket ${id} not found`);
        return { data: ticket };
    }
    async create(orgId, dto) {
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
        const conversation = await this.prisma.conversation.create({
            data: {
                organizationId: orgId,
                customerId: customer.id,
                channel: dto.channel,
            },
        });
        const message = await this.prisma.message.create({
            data: {
                organizationId: orgId,
                conversationId: conversation.id,
                direction: enums_1.MessageDirection.INBOUND,
                body: dto.firstMessage,
                authorType: enums_1.MessageAuthorType.CUSTOMER,
                authorId: customer.id,
            },
        });
        const ticket = await this.prisma.ticket.create({
            data: {
                organizationId: orgId,
                conversationId: conversation.id,
                customerId: customer.id,
                subject: dto.subject,
                channel: dto.channel,
                priority: dto.priority ?? enums_1.TicketPriority.NORMAL,
                tags: dto.tags ?? [],
            },
            include: TICKET_INCLUDE,
        });
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
    async update(orgId, id, dto) {
        const ticket = await this.findOrThrow(orgId, id);
        const data = {
            ...(dto.priority !== undefined && {
                priority: dto.priority,
            }),
            ...(dto.tags !== undefined && { tags: dto.tags }),
            ...(dto.assigneeId !== undefined && { assigneeId: dto.assigneeId }),
            ...(dto.aiStatus !== undefined && { aiStatus: dto.aiStatus }),
        };
        const statusData = dto.status !== undefined
            ? this.getStatusUpdate(ticket.status, dto.status)
            : {};
        const updated = await this.prisma.ticket.update({
            where: { id },
            data: { ...data, ...statusData },
            include: TICKET_INCLUDE,
        });
        await this.writeAudit(orgId, 'UPDATE', 'Ticket', id, dto);
        return { data: updated };
    }
    async transition(orgId, id, dto) {
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
    async assign(orgId, id, dto, user) {
        const ticket = await this.findOrThrow(orgId, id);
        const updated = await this.prisma.ticket.update({
            where: { id },
            data: { assigneeId: dto.assigneeId || null },
            include: TICKET_INCLUDE,
        });
        await this.writeAudit(orgId, 'ASSIGN', 'Ticket', id, {
            assignedTo: dto.assigneeId || null,
            previousAssignee: ticket.assigneeId,
            reason: dto.reason || null,
            assignedBy: user.sub,
        });
        return { data: updated };
    }
    async remove(orgId, id) {
        await this.findOrThrow(orgId, id);
        await this.prisma.ticket.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        await this.writeAudit(orgId, 'DELETE', 'Ticket', id, {});
        return { data: { message: 'Ticket deleted' } };
    }
    async findOrThrow(orgId, id) {
        const ticket = await this.prisma.ticket.findFirst({
            where: { id, organizationId: orgId, deletedAt: null },
        });
        if (!ticket)
            throw new common_1.NotFoundException(`Ticket ${id} not found`);
        return ticket;
    }
    getStatusUpdate(current, next) {
        if (current === next)
            return { status: next };
        const allowed = {
            [enums_1.TicketStatus.NEW]: [enums_1.TicketStatus.OPEN],
            [enums_1.TicketStatus.OPEN]: [enums_1.TicketStatus.PENDING, enums_1.TicketStatus.SOLVED],
            [enums_1.TicketStatus.PENDING]: [enums_1.TicketStatus.OPEN],
            [enums_1.TicketStatus.SOLVED]: [enums_1.TicketStatus.CLOSED, enums_1.TicketStatus.OPEN],
            [enums_1.TicketStatus.CLOSED]: [],
        };
        if (!allowed[current].includes(next)) {
            throw new common_1.BadRequestException(`Invalid ticket transition ${current} -> ${next}`);
        }
        return {
            status: next,
            ...(next === enums_1.TicketStatus.SOLVED && { solvedAt: new Date() }),
            ...(next === enums_1.TicketStatus.OPEN &&
                current === enums_1.TicketStatus.SOLVED && { solvedAt: null }),
        };
    }
    async writeAudit(orgId, action, entityType, entityId, metadata) {
        await this.prisma.auditRecord.create({
            data: {
                organizationId: orgId,
                actorType: enums_1.AuditActorType.SYSTEM,
                actorId: null,
                action,
                entityType,
                entityId,
                metadata: metadata,
            },
        });
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map