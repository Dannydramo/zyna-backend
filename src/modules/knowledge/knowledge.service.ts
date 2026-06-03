import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditActorType } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateKnowledgeArticleDto } from './dto/create-knowledge-article.dto';
import type { UpdateKnowledgeArticleDto } from './dto/update-knowledge-article.dto';

@Injectable()
export class KnowledgeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(orgId: string, dto: CreateKnowledgeArticleDto) {
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

  async findAll(orgId: string) {
    const articles = await this.prisma.knowledgeArticle.findMany({
      where: { organizationId: orgId },
      orderBy: { freshnessUpdatedAt: 'desc' },
    });
    return { data: articles };
  }

  async update(orgId: string, id: string, dto: UpdateKnowledgeArticleDto) {
    await this.findOneOrThrow(orgId, id);
    const article = await this.prisma.knowledgeArticle.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.title !== undefined || dto.body !== undefined
          ? {
              embedding: this.simpleEmbedding(
                `${dto.title ?? ''} ${dto.body ?? ''}`,
              ),
              freshnessUpdatedAt: new Date(),
            }
          : {}),
      },
    });
    await this.audit(orgId, 'UPDATE', id, dto as Record<string, unknown>);
    return { data: article };
  }

  async delete(orgId: string, id: string) {
    await this.findOneOrThrow(orgId, id);
    await this.prisma.knowledgeArticle.delete({
      where: { id },
    });
    await this.audit(orgId, 'DELETE', id, {});
    return { success: true };
  }

  async retrieve(orgId: string, text: string, take = 3) {
    const articles = await this.prisma.knowledgeArticle.findMany({
      where: { organizationId: orgId },
      orderBy: { freshnessUpdatedAt: 'desc' },
    });
    const terms = this.terms(text);
    return articles
      .map((article) => ({
        article,
        score: this.terms(
          `${article.title} ${article.body} ${article.tags.join(' ')}`,
        ).filter((term) => terms.includes(term)).length,
      }))
      .sort((left, right) => right.score - left.score)
      .slice(0, take)
      .map(({ article }) => article);
  }

  private async findOneOrThrow(orgId: string, id: string) {
    const article = await this.prisma.knowledgeArticle.findFirst({
      where: { id, organizationId: orgId },
    });
    if (!article)
      throw new NotFoundException(`Knowledge article ${id} not found`);
    return article;
  }

  private simpleEmbedding(text: string) {
    return this.terms(text).slice(0, 64);
  }

  private terms(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter((term) => term.length > 2);
  }

  private async audit(
    orgId: string,
    action: string,
    entityId: string,
    metadata: Record<string, unknown>,
  ) {
    await this.prisma.auditRecord.create({
      data: {
        organizationId: orgId,
        actorType: AuditActorType.SYSTEM,
        action,
        entityType: 'KnowledgeArticle',
        entityId,
        metadata: metadata as unknown as Parameters<
          typeof this.prisma.auditRecord.create
        >[0]['data']['metadata'],
      },
    });
  }
}
