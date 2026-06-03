import { PrismaService } from '../../prisma/prisma.service';
import type { CreateKnowledgeArticleDto } from './dto/create-knowledge-article.dto';
import type { UpdateKnowledgeArticleDto } from './dto/update-knowledge-article.dto';
export declare class KnowledgeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(orgId: string, dto: CreateKnowledgeArticleDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            body: string;
            tags: string[];
            title: string;
            embedding: import("@prisma/client/runtime/client").JsonValue | null;
            freshnessUpdatedAt: Date;
        };
    }>;
    findAll(orgId: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            body: string;
            tags: string[];
            title: string;
            embedding: import("@prisma/client/runtime/client").JsonValue | null;
            freshnessUpdatedAt: Date;
        }[];
    }>;
    update(orgId: string, id: string, dto: UpdateKnowledgeArticleDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            body: string;
            tags: string[];
            title: string;
            embedding: import("@prisma/client/runtime/client").JsonValue | null;
            freshnessUpdatedAt: Date;
        };
    }>;
    delete(orgId: string, id: string): Promise<{
        success: boolean;
    }>;
    retrieve(orgId: string, text: string, take?: number): Promise<{
        id: string;
        createdAt: Date;
        organizationId: string;
        body: string;
        tags: string[];
        title: string;
        embedding: import("@prisma/client/runtime/client").JsonValue | null;
        freshnessUpdatedAt: Date;
    }[]>;
    private findOneOrThrow;
    private simpleEmbedding;
    private terms;
    private audit;
}
