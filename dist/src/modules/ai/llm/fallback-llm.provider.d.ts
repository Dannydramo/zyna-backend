import { ConfigService } from '@nestjs/config';
import { LlmProvider, SuggestionInput, SuggestionOutput } from './llm-provider';
export declare class FallbackLlmProvider extends LlmProvider {
    private readonly primaryProvider;
    private readonly fallbackProvider;
    private readonly logger;
    constructor(config: ConfigService);
    generateSuggestion(input: SuggestionInput): Promise<SuggestionOutput>;
    private timeout;
    private mockSuggestion;
    private classify;
}
