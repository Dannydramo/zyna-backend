import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@ApiTags('knowledge-public')
@Controller('articles')
export class KnowledgePublicController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a public knowledge article by ID (no auth required)' })
  async getArticle(@Param('id') id: string) {
    const article = await this.prisma.knowledgeArticle.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article ${id} not found`);
    }

    return { data: article };
  }
}
