export interface RetrievedArticle {
  id: string;
  title: string;
  body: string;
}

export interface SuggestionInput {
  subject: string;
  message: string;
  articles: RetrievedArticle[];
}

export interface SuggestionOutput {
  intent: string;
  draft: string;
  citations: string[];
  confidence: number;
}

export abstract class LlmProvider {
  abstract generateSuggestion(
    input: SuggestionInput,
  ): Promise<SuggestionOutput>;
}
