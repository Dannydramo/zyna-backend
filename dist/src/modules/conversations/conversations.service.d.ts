import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageAuthorType, MessageDirection } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import { IngestionService } from '../ingestion/ingestion.service';
import type { RequestUser } from '../../common/decorators/current-user.decorator';
import type { CreateMessageDto } from './dto/create-message.dto';
export interface InboundMessageEvent {
    organizationId: string;
    ticketId: string;
    messageId: string;
}
export declare class ConversationsService {
    private readonly prisma;
    private readonly events;
    private readonly ingestion;
    private readonly config;
    private readonly logger;
    constructor(prisma: PrismaService, events: EventEmitter2, ingestion: IngestionService, config: ConfigService);
    findTicketMessages(orgId: string, ticketId: string): Promise<{
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
            deliveryStatus: import("../../generated/prisma/enums").DeliveryStatus;
            headers: import("@prisma/client/runtime/client").JsonValue;
        }[];
    }>;
    createAgentReply(orgId: string, ticketId: string, dto: CreateMessageDto, user: RequestUser): Promise<{
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
            deliveryStatus: import("../../generated/prisma/enums").DeliveryStatus;
            headers: import("@prisma/client/runtime/client").JsonValue;
        };
    }>;
    createInboundMessage(orgId: string, ticketId: string, body: string, customerId: string, externalMessageId?: string, headers?: Record<string, unknown>): Promise<{
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
        deliveryStatus: import("../../generated/prisma/enums").DeliveryStatus;
        headers: import("@prisma/client/runtime/client").JsonValue;
    }>;
    private findTicket;
    private writeAudit;
}
