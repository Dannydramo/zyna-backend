import { PrismaService } from '../../prisma/prisma.service';
export declare class KnowledgePublicController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getArticle(id: string): Promise<{
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
}
