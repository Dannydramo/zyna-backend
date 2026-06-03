import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../common/decorators/current-org.decorator';
import { CreateKnowledgeArticleDto } from './dto/create-knowledge-article.dto';
import { UpdateKnowledgeArticleDto } from './dto/update-knowledge-article.dto';
import { KnowledgeService } from './knowledge.service';

@ApiBearerAuth()
@ApiTags('knowledge')
@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a knowledge article' })
  create(@CurrentOrg() orgId: string, @Body() dto: CreateKnowledgeArticleDto) {
    return this.knowledgeService.create(orgId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List knowledge articles' })
  findAll(@CurrentOrg() orgId: string) {
    return this.knowledgeService.findAll(orgId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a knowledge article' })
  update(
    @CurrentOrg() orgId: string,
    @Param('id') id: string,
    @Body() dto: UpdateKnowledgeArticleDto,
  ) {
    return this.knowledgeService.update(orgId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a knowledge article' })
  delete(@CurrentOrg() orgId: string, @Param('id') id: string) {
    return this.knowledgeService.delete(orgId, id);
  }
}
