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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiLlmProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = __importDefault(require("openai"));
const llm_provider_1 = require("./llm-provider");
let OpenAiLlmProvider = class OpenAiLlmProvider extends llm_provider_1.LlmProvider {
    constructor(config) {
        super();
        const apiKey = config.get('OPENAI_API_KEY');
        this.model = config.get('OPENAI_MODEL') ?? 'gpt-4.1-mini';
        this.client = apiKey ? new openai_1.default({ apiKey }) : null;
    }
    async generateSuggestion(input) {
        if (!this.client)
            return this.mockSuggestion(input);
        const response = await this.client.chat.completions.create({
            model: this.model,
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: 'You draft concise customer support replies. Return JSON with intent, draft, citations, confidence. citations must be article ids.',
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
        content = content.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
        const parsed = JSON.parse(content);
        return {
            intent: parsed.intent ?? 'general_support',
            draft: parsed.draft ?? this.mockSuggestion(input).draft,
            citations: parsed.citations?.length
                ? parsed.citations
                : input.articles.slice(0, 1).map((a) => a.id),
            confidence: parsed.confidence ?? 0.65,
        };
    }
    mockSuggestion(input) {
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
exports.OpenAiLlmProvider = OpenAiLlmProvider;
exports.OpenAiLlmProvider = OpenAiLlmProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenAiLlmProvider);
//# sourceMappingURL=openai-llm.provider.js.map