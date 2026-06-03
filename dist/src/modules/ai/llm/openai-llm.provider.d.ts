import { ConfigService } from '@nestjs/config';
import { LlmProvider, SuggestionInput, SuggestionOutput } from './llm-provider';
export declare class OpenAiLlmProvider extends LlmProvider {
    private readonly client;
    private readonly model;
    constructor(config: ConfigService);
    generateSuggestion(input: SuggestionInput): Promise<SuggestionOutput>;
    private mockSuggestion;
    private classify;
}
