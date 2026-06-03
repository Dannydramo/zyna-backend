import { Channel, TicketPriority } from '../../../generated/prisma/enums';
export declare class CreateTicketDto {
    customerName: string;
    customerEmail: string;
    subject: string;
    firstMessage: string;
    channel: Channel;
    priority?: TicketPriority;
    tags?: string[];
}
