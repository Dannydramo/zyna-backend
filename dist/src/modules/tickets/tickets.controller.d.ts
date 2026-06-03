import { type RequestUser } from '../../common/decorators/current-user.decorator';
import { TicketsService } from './tickets.service';
import { ListTicketsDto } from './dto/list-tickets.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TransitionTicketDto } from './dto/transition-ticket.dto';
import { AssignTicketDto } from './dto/assign-ticket.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    findAll(orgId: string, user: RequestUser, query: ListTicketsDto): Promise<import("../../common/dto/pagination.dto").PaginatedResponse<unknown>>;
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
    remove(orgId: string, id: string): Promise<{
        data: {
            message: string;
        };
    }>;
    assign(orgId: string, user: RequestUser, id: string, dto: AssignTicketDto): Promise<{
        data: unknown;
    }>;
}
