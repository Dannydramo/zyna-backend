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
exports.ChannelConnectionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ChannelConnectionsService = class ChannelConnectionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(orgId, query) {
        const where = {
            organizationId: orgId,
            ...(query.channel && { channel: query.channel }),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.channelConnection.findMany({
                where,
                orderBy: { channel: 'asc' },
            }),
            this.prisma.channelConnection.count({ where }),
        ]);
        return { data, meta: { page: 1, limit: 100, total } };
    }
    async get(orgId, channel) {
        const connection = await this.prisma.channelConnection.findFirst({
            where: { organizationId: orgId, channel },
        });
        if (!connection)
            throw new common_1.NotFoundException(`${channel} channel not configured`);
        return { data: connection };
    }
    async getOrCreate(orgId, channel) {
        let connection = await this.prisma.channelConnection.findFirst({
            where: { organizationId: orgId, channel },
        });
        if (!connection) {
            connection = await this.prisma.channelConnection.create({
                data: {
                    organizationId: orgId,
                    channel,
                    status: 'PENDING',
                    config: {},
                },
            });
        }
        return { data: connection };
    }
    async update(orgId, channel, config, status) {
        const connection = await this.prisma.channelConnection.findFirst({
            where: { organizationId: orgId, channel },
        });
        if (!connection) {
            const created = await this.prisma.channelConnection.create({
                data: {
                    organizationId: orgId,
                    channel,
                    status: (status ?? 'PENDING'),
                    config: config,
                },
            });
            return { data: created };
        }
        const updated = await this.prisma.channelConnection.update({
            where: { id: connection.id },
            data: {
                config: { ...connection.config, ...config },
                ...(status && { status: status }),
            },
        });
        return { data: updated };
    }
    async delete(orgId, channel) {
        const connection = await this.prisma.channelConnection.findFirst({
            where: { organizationId: orgId, channel },
        });
        if (!connection)
            throw new common_1.NotFoundException(`${channel} channel not configured`);
        await this.prisma.channelConnection.delete({ where: { id: connection.id } });
        return { data: { message: 'Channel disconnected' } };
    }
};
exports.ChannelConnectionsService = ChannelConnectionsService;
exports.ChannelConnectionsService = ChannelConnectionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChannelConnectionsService);
//# sourceMappingURL=channel-connections.service.js.map