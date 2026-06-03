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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../../prisma/prisma.service");
const CUSTOMER_SELECT = {
    id: true,
    name: true,
    email: true,
    phone: true,
    avatarUrl: true,
    attributes: true,
    notes: true,
    createdAt: true,
};
let CustomersService = class CustomersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(orgId, query) {
        const { page = 1, limit = 20, q } = query;
        const skip = (page - 1) * limit;
        const where = {
            organizationId: orgId,
            ...(q && {
                OR: [
                    { name: { contains: q, mode: 'insensitive' } },
                    { email: { contains: q, mode: 'insensitive' } },
                ],
            }),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.customer.findMany({
                where,
                select: CUSTOMER_SELECT,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.customer.count({ where }),
        ]);
        return { data, meta: { page, limit, total } };
    }
    async findOne(orgId, id) {
        const customer = await this.prisma.customer.findFirst({
            where: { id, organizationId: orgId },
            select: {
                ...CUSTOMER_SELECT,
                tickets: {
                    where: { deletedAt: null },
                    orderBy: { updatedAt: 'desc' },
                    include: {
                        assignee: { select: { id: true, name: true } },
                    },
                },
                conversations: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        messages: { orderBy: { createdAt: 'asc' } },
                    },
                },
            },
        });
        if (!customer)
            throw new common_1.NotFoundException(`Customer ${id} not found`);
        return { data: customer };
    }
    async update(orgId, id, dto) {
        await this.findOne(orgId, id);
        const customer = await this.prisma.customer.update({
            where: { id },
            data: {
                ...(dto.name !== undefined && { name: dto.name }),
                ...(dto.phone !== undefined && { phone: dto.phone }),
                ...(dto.avatarUrl !== undefined && { avatarUrl: dto.avatarUrl }),
                ...(dto.attributes !== undefined && {
                    attributes: dto.attributes,
                }),
                ...(dto.notes !== undefined && { notes: dto.notes }),
            },
            select: CUSTOMER_SELECT,
        });
        await this.prisma.auditRecord.create({
            data: {
                organizationId: orgId,
                actorType: enums_1.AuditActorType.SYSTEM,
                action: 'UPDATE',
                entityType: 'Customer',
                entityId: id,
                metadata: dto,
            },
        });
        return { data: customer };
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map