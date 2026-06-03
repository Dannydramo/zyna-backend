import { CreateKnowledgeArticleDto } from './dto/create-knowledge-article.dto';
import { UpdateKnowledgeArticleDto } from './dto/update-knowledge-article.dto';
import { KnowledgeService } from './knowledge.service';
export declare class KnowledgeController {
    private readonly knowledgeService;
    constructor(knowledgeService: KnowledgeService);
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
}
