"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../../prisma/prisma.service");
let KnowledgeService = class KnowledgeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(orgId, dto) {
        const article = await this.prisma.knowledgeArticle.create({
            data: {
                organizationId: orgId,
                title: dto.title,
                body: dto.body,
                tags: dto.tags ?? [],
                embedding: this.simpleEmbedding(`${dto.title} ${dto.body}`),
            },
        });
        await this.audit(orgId, 'CREATE', article.id, { title: article.title });
        return { data: article };
    }
    async findAll(orgId) {
        const articles = await this.prisma.knowledgeArticle.findMany({
            where: { organizationId: orgId },
            orderBy: { freshnessUpdatedAt: 'desc' },
        });
        return { data: articles };
    }
    async update(orgId, id, dto) {
        await this.findOneOrThrow(orgId, id);
        const article = await this.prisma.knowledgeArticle.update({
            where: { id },
            data: {
                ...dto,
                ...(dto.title !== undefined || dto.body !== undefined
                    ? {
                        embedding: this.simpleEmbedding(`${dto.title ?? ''} ${dto.body ?? ''}`),
                        freshnessUpdatedAt: new Date(),
                    }
                    : {}),
            },
        });
        await this.audit(orgId, 'UPDATE', id, dto);
        return { data: article };
    }
    async delete(orgId, id) {
        await this.findOneOrThrow(orgId, id);
        await this.prisma.knowledgeArticle.delete({
            where: { id },
        });
        await this.audit(orgId, 'DELETE', id, {});
        return { success: true };
    }
    async retrieve(orgId, text, take = 3) {
        const articles = await this.prisma.knowledgeArticle.findMany({
            where: { organizationId: orgId },
            orderBy: { freshnessUpdatedAt: 'desc' },
        });
        const terms = this.terms(text);
        return articles
            .map((article) => ({
            article,
            score: this.terms(`${article.title} ${article.body} ${article.tags.join(' ')}`).filter((term) => terms.includes(term)).length,
        }))
            .sort((left, right) => right.score - left.score)
            .slice(0, take)
            .map(({ article }) => article);
    }
    async findOneOrThrow(orgId, id) {
        const article = await this.prisma.knowledgeArticle.findFirst({
            where: { id, organizationId: orgId },
        });
        if (!article)
            throw new common_1.NotFoundException(`Knowledge article ${id} not found`);
        return article;
    }
    simpleEmbedding(text) {
        return this.terms(text).slice(0, 64);
    }
    terms(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, ' ')
            .split(/\s+/)
            .filter((term) => term.length > 2);
    }
    async audit(orgId, action, entityId, metadata) {
        await this.prisma.auditRecord.create({
            data: {
                organizationId: orgId,
                actorType: enums_1.AuditActorType.SYSTEM,
                action,
                entityType: 'KnowledgeArticle',
                entityId,
                metadata: metadata,
            },
        });
    }
};
exports.KnowledgeService = KnowledgeService;
exports.KnowledgeService = KnowledgeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KnowledgeService);
//# sourceMappingURL=knowledge.service.js.map