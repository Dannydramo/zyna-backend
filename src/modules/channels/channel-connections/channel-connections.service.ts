import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { Channel } from '../../../generated/prisma/enums';
import type { ListConnectionsDto } from './dto/list-connections.dto';

@Injectable()
export class ChannelConnectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(orgId: string, query: ListConnectionsDto) {
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

  async get(orgId: string, channel: Channel) {
    const connection = await this.prisma.channelConnection.findFirst({
      where: { organizationId: orgId, channel },
    });
    if (!connection) throw new NotFoundException(`${channel} channel not configured`);
    return { data: connection };
  }

  async getOrCreate(orgId: string, channel: Channel) {
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

  async update(
    orgId: string,
    channel: Channel,
    config: Record<string, unknown>,
    status?: string,
  ) {
    const connection = await this.prisma.channelConnection.findFirst({
      where: { organizationId: orgId, channel },
    });
    if (!connection) {
      const created = await this.prisma.channelConnection.create({
        data: {
          organizationId: orgId,
          channel,
          status: (status ?? 'PENDING') as 'ACTIVE' | 'PENDING' | 'ERROR',
          config: config as any,
        },
      });
      return { data: created };
    }
    const updated = await this.prisma.channelConnection.update({
      where: { id: connection.id },
      data: {
        config: { ...(connection.config as any), ...config } as any,
        ...(status && { status: status as 'ACTIVE' | 'PENDING' | 'ERROR' }),
      },
    });
    return { data: updated };
  }

  async delete(orgId: string, channel: Channel) {
    const connection = await this.prisma.channelConnection.findFirst({
      where: { organizationId: orgId, channel },
    });
    if (!connection) throw new NotFoundException(`${channel} channel not configured`);
    await this.prisma.channelConnection.delete({ where: { id: connection.id } });
    return { data: { message: 'Channel disconnected' } };
  }
}
