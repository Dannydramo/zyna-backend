import { MessageAuthorType, MessageDirection } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { IngestionService } from '../ingestion/ingestion.service';
import type { InboundMessageEvent } from '../conversations/conversations.service';
import { LlmProvider } from './llm/llm-provider';
export declare class AiService {
    private readonly prisma;
    private readonly knowledge;
    private readonly llm;
    private readonly ingestion;
    private readonly logger;
    constructor(prisma: PrismaService, knowledge: KnowledgeService, llm: LlmProvider, ingestion: IngestionService);
    handleInboundMessage(event: InboundMessageEvent): Promise<void>;
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
    suggest(orgId: string, ticketId: string, messageId?: string): Promise<{
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
    accept(orgId: string, ticketId: string, suggestionId?: string): Promise<{
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
    reject(orgId: string, suggestionId: string): Promise<{
        data: {
            success: boolean;
        };
    }>;
    private audit;
}
