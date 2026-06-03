"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var GroqLlmProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroqLlmProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const llm_provider_1 = require("./llm-provider");
let GroqLlmProvider = GroqLlmProvider_1 = class GroqLlmProvider extends llm_provider_1.LlmProvider {
    constructor(config) {
        super();
        this.logger = new common_1.Logger(GroqLlmProvider_1.name);
        const apiKey = config.get('GROQ_API_KEY');
        this.model = config.get('GROQ_MODEL') ?? 'llama-3-70b-8192';
        this.client = apiKey ? new groq_sdk_1.default({ apiKey }) : null;
    }
    async generateSuggestion(input) {
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
            this.logger.debug('Raw Groq response:');
            this.logger.debug(JSON.stringify(content, null, 2));
            content = content.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON object found in response');
            }
            content = jsonMatch[0];
            this.logger.debug('Cleaned Groq response:');
            this.logger.debug(content);
            const parsed = JSON.parse(content);
            return {
                intent: parsed.intent ?? 'general_support',
                draft: parsed.draft ?? this.mockSuggestion(input).draft,
                citations: Array.isArray(parsed.citations) && parsed.citations.length
                    ? parsed.citations
                    : input.articles.slice(0, 1).map((a) => a.id),
                confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.65,
            };
        }
        catch (error) {
            this.logger.error('Groq API error:', error);
            return this.mockSuggestion(input);
        }
    }
    mockSuggestion(input) {
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
    classify(message) {
        const text = message.toLowerCase();
        if (text.includes('refund') ||
            text.includes('charged') ||
            text.includes('billing'))
            return 'billing';
        if (text.includes('password') || text.includes('account'))
            return 'account_access';
        if (text.includes('deliver') ||
            text.includes('package') ||
            text.includes('order'))
            return 'shipping';
        if (text.includes('crash') || text.includes('bug'))
            return 'technical_issue';
        return 'general_support';
    }
};
exports.GroqLlmProvider = GroqLlmProvider;
exports.GroqLlmProvider = GroqLlmProvider = GroqLlmProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GroqLlmProvider);
//# sourceMappingURL=groq-llm.provider.js.map