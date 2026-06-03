import { AcceptSuggestionDto } from './dto/accept-suggestion.dto';
import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    getSuggestion(orgId: string, ticketId: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            intent: string;
            ticketId: string;
            messageId: string | null;
            draft: string;
            citations: import("@prisma/client/runtime/client").JsonValue;
            confidence: number;
            acceptedAt: Date | null;
            rejectedAt: Date | null;
        } | null;
    }>;
    suggest(orgId: string, ticketId: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            intent: string;
            ticketId: string;
            messageId: string | null;
            draft: string;
            citations: import("@prisma/client/runtime/client").JsonValue;
            confidence: number;
            acceptedAt: Date | null;
            rejectedAt: Date | null;
        };
    }>;
    accept(orgId: string, ticketId: string, dto: AcceptSuggestionDto): Promise<{
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
    reject(orgId: string, suggestionId: string): Promise<{
        data: {
            success: boolean;
        };
    }>;
}
