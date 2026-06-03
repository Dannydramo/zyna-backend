import { Module } from '@nestjs/common';
import { KnowledgeModule } from '../knowledge/knowledge.module';
import { IngestionModule } from '../ingestion/ingestion.module';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { LlmProvider } from './llm/llm-provider';
import { FallbackLlmProvider } from './llm/fallback-llm.provider';

@Module({
  imports: [KnowledgeModule, IngestionModule],
  controllers: [AiController],
  providers: [
    AiService,
    { provide: LlmProvider, useClass: FallbackLlmProvider },
  ],
  exports: [AiService],
})
export class AiModule {}
