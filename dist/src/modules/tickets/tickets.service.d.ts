import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';
import type { PaginatedResponse } from '../../common/dto/pagination.dto';
import type { ListTicketsDto } from './dto/list-tickets.dto';
import type { CreateTicketDto } from './dto/create-ticket.dto';
import type { UpdateTicketDto } from './dto/update-ticket.dto';
import type { TransitionTicketDto } from './dto/transition-ticket.dto';
import type { AssignTicketDto } from './dto/assign-ticket.dto';
import type { RequestUser } from '../../common/decorators/current-user.decorator';
export declare class TicketsService {
    private readonly prisma;
    private readonly events;
    constructor(prisma: PrismaService, events: EventEmitter2);
    findAll(orgId: string, user: RequestUser, query: ListTicketsDto): Promise<PaginatedResponse<unknown>>;
    findOne(orgId: string, id: string): Promise<{
        data: unknown;
    }>;
    create(orgId: string, dto: CreateTicketDto): Promise<{
        data: unknown;
    }>;
    update(orgId: string, id: string, dto: UpdateTicketDto): Promise<{
        data: unknown;
    }>;
    transition(orgId: string, id: string, dto: TransitionTicketDto): Promise<{
        data: unknown;
    }>;
    assign(orgId: string, id: string, dto: AssignTicketDto, user: RequestUser): Promise<{
        data: unknown;
    }>;
    remove(orgId: string, id: string): Promise<{
        data: {
            message: string;
        };
    }>;
    private findOrThrow;
    private getStatusUpdate;
    private writeAudit;
}
