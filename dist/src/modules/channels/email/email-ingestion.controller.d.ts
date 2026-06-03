import { PrismaService } from '../../../prisma/prisma.service';
import { IngestionService } from '../../ingestion/ingestion.service';
import type { InboundEmailDto } from '../../ingestion/dto/inbound-email.dto';
export declare class EmailIngestionController {
    private readonly ingestionService;
    private readonly prisma;
    constructor(ingestionService: IngestionService, prisma: PrismaService);
    ingestEmail(dto: InboundEmailDto): Promise<{
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
                status: import("../../../generated/prisma/enums").TicketStatus;
                customerId: string;
                channel: import("../../../generated/prisma/enums").Channel;
                conversationId: string;
                subject: string;
                priority: import("../../../generated/prisma/enums").TicketPriority;
                assigneeId: string | null;
                tags: string[];
                aiStatus: import("../../../generated/prisma/enums").AiStatus;
                intent: string | null;
                slaState: import("../../../generated/prisma/enums").SlaState;
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
                direction: import("../../../generated/prisma/enums").MessageDirection;
                body: string;
                authorType: import("../../../generated/prisma/enums").MessageAuthorType;
                authorId: string | null;
                externalMessageId: string | null;
                providerMessageId: string | null;
                deliveryStatus: import("../../../generated/prisma/enums").DeliveryStatus;
                headers: import("@prisma/client/runtime/client").JsonValue;
            };
            duplicate?: undefined;
            messageId?: undefined;
        };
    }>;
}
