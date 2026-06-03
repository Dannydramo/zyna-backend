import { TicketStatus } from '../../../generated/prisma/enums';
export declare class TransitionTicketDto {
    status: TicketStatus;
    reason?: string;
}
