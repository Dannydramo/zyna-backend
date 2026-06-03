import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditActorType } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import type { PaginatedResponse } from '../../common/dto/pagination.dto';
import type { ListCustomersDto } from './dto/list-customers.dto';
import type { UpdateCustomerDto } from './dto/update-customer.dto';

const CUSTOMER_SELECT = {
  id: true,
  name: true,
  email: true,
  phone: true,
  avatarUrl: true,
  attributes: true,
  notes: true,
  createdAt: true,
} as const;

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    orgId: string,
    query: ListCustomersDto,
  ): Promise<PaginatedResponse<unknown>> {
    const { page = 1, limit = 20, q } = query;
    const skip = (page - 1) * limit;
    const where = {
      organizationId: orgId,
      ...(q && {
        OR: [
          { name: { contains: q, mode: 'insensitive' as const } },
          { email: { contains: q, mode: 'insensitive' as const } },
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

  async findOne(orgId: string, id: string) {
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
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);
    return { data: customer };
  }

  async update(orgId: string, id: string, dto: UpdateCustomerDto) {
    await this.findOne(orgId, id);
    const customer = await this.prisma.customer.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.phone !== undefined && { phone: dto.phone }),
        ...(dto.avatarUrl !== undefined && { avatarUrl: dto.avatarUrl }),
        ...(dto.attributes !== undefined && {
          attributes: dto.attributes as unknown as Parameters<
            typeof this.prisma.customer.update
          >[0]['data']['attributes'],
        }),
        ...(dto.notes !== undefined && { notes: dto.notes }),
      },
      select: CUSTOMER_SELECT,
    });
    await this.prisma.auditRecord.create({
      data: {
        organizationId: orgId,
        actorType: AuditActorType.SYSTEM,
        action: 'UPDATE',
        entityType: 'Customer',
        entityId: id,
        metadata: dto as unknown as Parameters<
          typeof this.prisma.auditRecord.create
        >[0]['data']['metadata'],
      },
    });
    return { data: customer };
  }
}
