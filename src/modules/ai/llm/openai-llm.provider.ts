import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { LlmProvider, SuggestionInput, SuggestionOutput } from './llm-provider';

@Injectable()
export class OpenAiLlmProvider extends LlmProvider {
  private readonly client: OpenAI | null;
  private readonly model: string;

  constructor(config: ConfigService) {
    super();
    const apiKey = config.get<string>('OPENAI_API_KEY');
    this.model = config.get<string>('OPENAI_MODEL') ?? 'gpt-4.1-mini';
    this.client = apiKey ? new OpenAI({ apiKey }) : null;
  }

  async generateSuggestion(input: SuggestionInput): Promise<SuggestionOutput> {
    if (!this.client) return this.mockSuggestion(input);

    const response = await this.client.chat.completions.create({
      model: this.model,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You draft concise customer support replies. Return JSON with intent, draft, citations, confidence. citations must be article ids.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            subject: input.subject,
            message: input.message,
            articles: input.articles,
          }),
        },
      ],
    });

    let content = response.choices[0]?.message.content ?? '{}';

    // Strip markdown code blocks if present (safety measure)
    content = content.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

    const parsed = JSON.parse(content) as Partial<SuggestionOutput>;
    return {
      intent: parsed.intent ?? 'general_support',
      draft: parsed.draft ?? this.mockSuggestion(input).draft,
      citations: parsed.citations?.length
        ? parsed.citations
        : input.articles.slice(0, 1).map((a) => a.id),
      confidence: parsed.confidence ?? 0.65,
    };
  }

  private mockSuggestion(input: SuggestionInput): SuggestionOutput {
    const article = input.articles[0];
    const citationLine = article
      ? ` I used the guidance from "${article.title}" to shape this.`
      : '';
    return {
      intent: this.classify(input.message),
      draft: `Thanks for reaching out. I understand the issue and I am checking the details now.${citationLine} I will help you resolve this as quickly as possible.`,
      citations: article ? [article.id] : ['manual_review'],
      confidence: article ? 0.74 : 0.42,
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
