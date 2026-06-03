import { ConfigService } from '@nestjs/config';
import { LlmProvider, SuggestionInput, SuggestionOutput } from './llm-provider';
export declare class GroqLlmProvider extends LlmProvider {
    private readonly client;
    private readonly model;
    private readonly logger;
    constructor(config: ConfigService);
    generateSuggestion(input: SuggestionInput): Promise<SuggestionOutput>;
    private mockSuggestion;
    private classify;
}
