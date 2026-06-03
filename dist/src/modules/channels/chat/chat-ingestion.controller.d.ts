import { PrismaService } from '../../../prisma/prisma.service';
import { ChatService } from './chat.service';
export declare class ChatIngestionController {
    private readonly chatService;
    private readonly prisma;
    private readonly logger;
    constructor(chatService: ChatService, prisma: PrismaService);
    startSession(dto: {
        widgetId: string;
        visitorId: string;
    }): Promise<{
        sessionId: string;
        orgId: string;
    }>;
    sendMessage(sessionId: string, dto: {
        widgetId: string;
        text: string;
        visitorEmail?: string;
    }): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            conversationId: string;
            direction: import("../../../generated/prisma/enums").MessageDirection;
            body: string;
            authorType: import("../../../generated/prisma/enums").MessageAuthorType;
            authorId: string | null;
            externalMessageId: string | null;
            providerMessageId: string | null;
            deliveryStatus: import("../../../generated/prisma/enums").DeliveryStatus;
            headers: import("@prisma/client/runtime/client").JsonValue;
        };
    }>;
    getMessages(sessionId: string, widgetId: string, since?: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            direction: import("../../../generated/prisma/enums").MessageDirection;
            body: string;
            authorType: import("../../../generated/prisma/enums").MessageAuthorType;
        }[];
    }>;
    updateSession(sessionId: string, dto: {
        widgetId: string;
        email: string;
    }): Promise<{
        ok: boolean;
    }>;
}
