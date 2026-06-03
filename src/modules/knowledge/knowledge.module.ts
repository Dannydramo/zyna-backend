import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgePublicController } from './knowledge-public.controller';
import { KnowledgeService } from './knowledge.service';

@Module({
  imports: [PrismaModule],
  controllers: [KnowledgeController, KnowledgePublicController],
  providers: [KnowledgeService],
  exports: [KnowledgeService],
})
export class KnowledgeModule {}
