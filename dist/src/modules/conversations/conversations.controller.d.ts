import { RequestUser } from '../../common/decorators/current-user.decorator';
import { ConversationsService } from './conversations.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    findTicketMessages(orgId: string, ticketId: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            conversationId: string;
            direction: import("../../generated/prisma/enums").MessageDirection;
            body: string;
            authorType: import("../../generated/prisma/enums").MessageAuthorType;
            authorId: string | null;
            externalMessageId: string | null;
            providerMessageId: string | null;
            deliveryStatus: import("../../generated/prisma/enums").DeliveryStatus;
            headers: import("@prisma/client/runtime/client").JsonValue;
        }[];
    }>;
    createAgentReply(orgId: string, user: RequestUser, ticketId: string, dto: CreateMessageDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            conversationId: string;
            direction: import("../../generated/prisma/enums").MessageDirection;
            body: string;
            authorType: import("../../generated/prisma/enums").MessageAuthorType;
            authorId: string | null;
            externalMessageId: string | null;
            providerMessageId: string | null;
            deliveryStatus: import("../../generated/prisma/enums").DeliveryStatus;
            headers: import("@prisma/client/runtime/client").JsonValue;
        };
    }>;
}
