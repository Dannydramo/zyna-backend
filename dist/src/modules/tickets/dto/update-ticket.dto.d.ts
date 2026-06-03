import { AiStatus, TicketPriority, TicketStatus } from '../../../generated/prisma/enums';
export declare class UpdateTicketDto {
    status?: TicketStatus;
    priority?: TicketPriority;
    tags?: string[];
    assigneeId?: string | null;
    aiStatus?: AiStatus;
}
