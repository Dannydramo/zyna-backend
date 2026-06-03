import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageAuthorType, MessageDirection } from '../../../generated/prisma/enums';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class ChatService {
    private readonly prisma;
    private readonly events;
    private readonly logger;
    constructor(prisma: PrismaService, events: EventEmitter2);
    startSession(widgetId: string, visitorId: string): Promise<{
        sessionId: string;
        orgId: string;
    }>;
    sendMessage(orgId: string, sessionId: string, body: string, visitorEmail?: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            conversationId: string;
            direction: MessageDirection;
            body: string;
            authorType: MessageAuthorType;
            authorId: string | null;
            externalMessageId: string | null;
            providerMessageId: string | null;
            deliveryStatus: import("../../../generated/prisma/enums").DeliveryStatus;
            headers: import("@prisma/client/runtime/client").JsonValue;
        };
    }>;
    getMessages(orgId: string, sessionId: string, since?: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            direction: MessageDirection;
            body: string;
            authorType: MessageAuthorType;
        }[];
    }>;
    updateSession(orgId: string, sessionId: string, email: string): Promise<{
        ok: boolean;
    }>;
}
