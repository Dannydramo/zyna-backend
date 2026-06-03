import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import { LlmProvider, SuggestionInput, SuggestionOutput } from './llm-provider';

@Injectable()
export class GroqLlmProvider extends LlmProvider {
  private readonly client: Groq | null;
  private readonly model: string;
  private readonly logger = new Logger(GroqLlmProvider.name);

  constructor(config: ConfigService) {
    super();
    const apiKey = config.get<string>('GROQ_API_KEY');
    this.model = config.get<string>('GROQ_MODEL') ?? 'llama-3-70b-8192';
    this.client = apiKey ? new Groq({ apiKey }) : null;
  }

  async generateSuggestion(input: SuggestionInput): Promise<SuggestionOutput> {
    if (!this.client) {
      this.logger.warn('Groq client not configured, using fallback');
      return this.mockSuggestion(input);
    }

    try {
      const systemPrompt = `You are a helpful customer support agent. Draft concise, professional support replies based on the customer's message and knowledge articles provided.
Always respond with valid JSON containing: intent, draft, citations (array of article ids), and confidence (0-1).
The draft should be a helpful, professional response to the customer's issue.
Citations should reference the IDs of articles you used (can be empty array if no articles are relevant).`;

      const userMessage = `
Subject: ${input.subject}
Message: ${input.message}

${input.articles.length > 0 ? `Knowledge Articles to reference:\n${input.articles.map((a) => `- ID: ${a.id}\n  Title: ${a.title}\n  Content: ${a.body}`).join('\n\n')}` : 'No knowledge articles available.'}

Please generate a helpful support response. Return JSON with: {"intent": "string", "draft": "string", "citations": ["article-ids"], "confidence": number}`;

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      });

      let content = response.choices[0]?.message.content ?? '{}';

      // Log raw response for debugging
      this.logger.debug('Raw Groq response:');
      this.logger.debug(JSON.stringify(content, null, 2));

      // Strip markdown code blocks if present
      content = content.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

      // Extract JSON object only (handle extra text after closing bracket)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON object found in response');
      }
      content = jsonMatch[0];

      // Log cleaned content
      this.logger.debug('Cleaned Groq response:');
      this.logger.debug(content);

      const parsed = JSON.parse(content) as Partial<SuggestionOutput>;

      return {
        intent: parsed.intent ?? 'general_support',
        draft: parsed.draft ?? this.mockSuggestion(input).draft,
        citations: Array.isArray(parsed.citations) && parsed.citations.length
          ? parsed.citations
          : input.articles.slice(0, 1).map((a) => a.id),
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.65,
      };
    } catch (error) {
      this.logger.error('Groq API error:', error);
      return this.mockSuggestion(input);
    }
  }

  private mockSuggestion(input: SuggestionInput): SuggestionOutput {
    const article = input.articles[0];
    const citationLine = article
      ? ` I found relevant information in "${article.title}" that I'm using to help you.`
      : '';
    return {
      intent: this.classify(input.message),
      draft: `Thank you for contacting us. I understand you need help with: ${input.subject}.${citationLine} I'll do my best to assist you promptly.`,
      citations: article ? [article.id] : ['manual_review'],
      confidence: article ? 0.72 : 0.4,
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
