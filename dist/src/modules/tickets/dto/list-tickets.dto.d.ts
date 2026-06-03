import { PaginationDto } from '../../../common/dto/pagination.dto';
import { AiStatus, Channel, TicketPriority, TicketStatus } from '../../../generated/prisma/enums';
export type TicketTab = 'all' | 'assigned' | 'unassigned' | 'ai-handled';
export declare class ListTicketsDto extends PaginationDto {
    tab?: TicketTab;
    status?: TicketStatus;
    channel?: Channel;
    priority?: TicketPriority;
    aiStatus?: AiStatus;
    assigneeId?: string;
    q?: string;
}
