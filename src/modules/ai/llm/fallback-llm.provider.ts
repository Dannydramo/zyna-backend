import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LlmProvider, SuggestionInput, SuggestionOutput } from './llm-provider';
import { OpenAiLlmProvider } from './openai-llm.provider';
import { GroqLlmProvider } from './groq-llm.provider';

@Injectable()
export class FallbackLlmProvider extends LlmProvider {
  private readonly primaryProvider: OpenAiLlmProvider;
  private readonly fallbackProvider: GroqLlmProvider;
  private readonly logger = new Logger(FallbackLlmProvider.name);

  constructor(config: ConfigService) {
    super();
    this.primaryProvider = new OpenAiLlmProvider(config);
    this.fallbackProvider = new GroqLlmProvider(config);
  }

  async generateSuggestion(
    input: SuggestionInput,
  ): Promise<SuggestionOutput> {
    try {
      this.logger.debug('Attempting to generate suggestion with OpenAI');
      const result = await Promise.race([
        this.primaryProvider.generateSuggestion(input),
        this.timeout(30000), // 30 second timeout
      ]);
      this.logger.debug('Successfully generated suggestion with OpenAI');
      return result as SuggestionOutput;
    } catch (error) {
      this.logger.warn(
        `OpenAI failed: ${error instanceof Error ? error.message : String(error)}, falling back to Groq`,
      );

      try {
        this.logger.debug('Attempting to generate suggestion with Groq');
        const result = await Promise.race([
          this.fallbackProvider.generateSuggestion(input),
          this.timeout(30000), // 30 second timeout
        ]);
        this.logger.debug('Successfully generated suggestion with Groq');
        return result as SuggestionOutput;
      } catch (fallbackError) {
        this.logger.error(
          `Both OpenAI and Groq failed: ${
            fallbackError instanceof Error
              ? fallbackError.message
              : String(fallbackError)
          }`,
        );
        return this.mockSuggestion(input);
      }
    }
  }

  private timeout(ms: number): Promise<never> {
    return new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`LLM request timeout after ${ms}ms`)),
        ms,
      ),
    );
  }

  private mockSuggestion(input: SuggestionInput): SuggestionOutput {
    const article = input.articles[0];
    const citationLine = article
      ? ` Based on our knowledge base article "${article.title}".`
      : '';
    return {
      intent: this.classify(input.message),
      draft: `Thank you for reaching out about "${input.subject}". I appreciate your message and will work to assist you.${citationLine} Our team is here to help.`,
      citations: article ? [article.id] : ['manual_review'],
      confidence: article ? 0.68 : 0.35,
    };
  }

  private classify(message: string) {
    const text = message.toLowerCase();
    if (
      text.includes('refund') ||
      text.includes('charged') ||
      text.includes('billing')
    )
      return 'billing';
    if (text.includes('password') || text.includes('account'))
      return 'account_access';
    if (
      text.includes('deliver') ||
      text.includes('package') ||
      text.includes('order')
    )
      return 'shipping';
    if (text.includes('crash') || text.includes('bug'))
      return 'technical_issue';
    return 'general_support';
  }
}
