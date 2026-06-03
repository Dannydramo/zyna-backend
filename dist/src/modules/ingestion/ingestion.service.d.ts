import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Channel, MessageAuthorType, MessageDirection, TicketPriority } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import type { InboundEmailDto } from './dto/inbound-email.dto';
import type { SendEmailDto } from './dto/send-email.dto';
export declare class IngestionService {
    private readonly prisma;
    private readonly config;
    private readonly events;
    private readonly logger;
    constructor(prisma: PrismaService, config: ConfigService, events: EventEmitter2);
    ingestEmail(orgId: string, dto: InboundEmailDto): Promise<{
        data: {
            duplicate: boolean;
            messageId: string;
            ticket?: undefined;
            message?: undefined;
        };
    } | {
        data: {
            ticket: {
                id: string;
                createdAt: Date;
                organizationId: string;
                status: import("../../generated/prisma/enums").TicketStatus;
                customerId: string;
                channel: Channel;
                conversationId: string;
                subject: string;
                priority: TicketPriority;
                assigneeId: string | null;
                tags: string[];
                aiStatus: import("../../generated/prisma/enums").AiStatus;
                intent: string | null;
                slaState: import("../../generated/prisma/enums").SlaState;
                firstResponseDueAt: Date | null;
                resolutionDueAt: Date | null;
                firstResponseAt: Date | null;
                solvedAt: Date | null;
                deletedAt: Date | null;
                updatedAt: Date;
            };
            message: {
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
            duplicate?: undefined;
            messageId?: undefined;
        };
    }>;
    sendEmail(dto: SendEmailDto): Promise<{
        data: {
            queued: boolean;
            message: string;
            messageId?: undefined;
        };
    } | {
        data: {
            queued: boolean;
            messageId: string;
            message?: undefined;
        };
    }>;
    pollImap(): Promise<void>;
    private pollOrgInbox;
    private createInboundMessage;
}
