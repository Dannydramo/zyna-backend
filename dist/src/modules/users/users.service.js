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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const crypto_1 = require("crypto");
let UsersService = class UsersService {
    constructor(prisma, emailService, configService) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.configService = configService;
    }
    async findAll(orgId) {
        const users = await this.prisma.user.findMany({
            where: { organizationId: orgId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                status: true,
                createdAt: true,
            },
            orderBy: { name: 'asc' },
        });
        return { data: users };
    }
    async update(orgId, id, dto, actor) {
        const existing = await this.prisma.user.findFirst({
            where: { id, organizationId: orgId },
        });
        if (!existing)
            throw new common_1.NotFoundException(`User ${id} not found`);
        const user = await this.prisma.user.update({
            where: { id },
            data: {
                ...(dto.role !== undefined && { role: dto.role }),
                ...(dto.status !== undefined && { status: dto.status }),
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });
        await this.prisma.auditRecord.create({
            data: {
                organizationId: orgId,
                actorType: enums_1.AuditActorType.USER,
                actorId: actor.sub,
                action: 'UPDATE',
                entityType: 'User',
                entityId: id,
                metadata: dto,
            },
        });
        return { data: user };
    }
    async invite(orgId, dto, actor) {
        const existing = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
                organizationId: orgId,
            },
        });
        if (existing) {
            throw new common_1.ConflictException(`User with email ${dto.email} already exists in this organization`);
        }
        const inviteToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const inviteTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                role: dto.role,
                organizationId: orgId,
                inviteToken,
                inviteTokenExpiresAt,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });
        await this.prisma.auditRecord.create({
            data: {
                organizationId: orgId,
                actorType: enums_1.AuditActorType.USER,
                actorId: actor.sub,
                action: 'INVITE',
                entityType: 'User',
                entityId: user.id,
                metadata: {
                    email: dto.email,
                    name: dto.name,
                    role: dto.role,
                },
            },
        });
        const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
        const inviteLink = `${frontendUrl}/invite/${inviteToken}`;
        try {
            const inviterUser = await this.prisma.user.findFirst({
                where: { id: actor.sub },
            });
            const inviterName = inviterUser?.name || 'Your team';
            await this.emailService.sendInviteEmail(dto.email, dto.name, inviterName, inviteLink);
        }
        catch (error) {
            console.error('Failed to send invite email:', error);
        }
        return { data: user };
    }
    async acceptInvite(dto) {
        const user = await this.prisma.user.findFirst({
            where: {
                inviteToken: dto.token,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired invite token');
        }
        if (user.inviteTokenExpiresAt && user.inviteTokenExpiresAt < new Date()) {
            throw new common_1.BadRequestException('Invite token has expired');
        }
        const passwordHash = (0, crypto_1.createHash)('sha256')
            .update(dto.password)
            .digest('hex');
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash,
                inviteToken: null,
                inviteTokenExpiresAt: null,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                status: true,
                organizationId: true,
            },
        });
        await this.prisma.auditRecord.create({
            data: {
                organizationId: user.organizationId,
                actorType: enums_1.AuditActorType.USER,
                actorId: user.id,
                action: 'ACCEPT_INVITE',
                entityType: 'User',
                entityId: user.id,
                metadata: { email: user.email },
            },
        });
        try {
            const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
            await this.emailService.sendWelcomeEmail(user.email, user.name, `${frontendUrl}/dashboard`);
        }
        catch (error) {
            console.error('Failed to send welcome email:', error);
        }
        return { data: updatedUser };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map