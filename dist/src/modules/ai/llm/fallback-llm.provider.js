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
var FallbackLlmProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallbackLlmProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const llm_provider_1 = require("./llm-provider");
const openai_llm_provider_1 = require("./openai-llm.provider");
const groq_llm_provider_1 = require("./groq-llm.provider");
let FallbackLlmProvider = FallbackLlmProvider_1 = class FallbackLlmProvider extends llm_provider_1.LlmProvider {
    constructor(config) {
        super();
        this.logger = new common_1.Logger(FallbackLlmProvider_1.name);
        this.primaryProvider = new openai_llm_provider_1.OpenAiLlmProvider(config);
        this.fallbackProvider = new groq_llm_provider_1.GroqLlmProvider(config);
    }
    async generateSuggestion(input) {
        try {
            this.logger.debug('Attempting to generate suggestion with OpenAI');
            const result = await Promise.race([
                this.primaryProvider.generateSuggestion(input),
                this.timeout(30000),
            ]);
            this.logger.debug('Successfully generated suggestion with OpenAI');
            return result;
        }
        catch (error) {
            this.logger.warn(`OpenAI failed: ${error instanceof Error ? error.message : String(error)}, falling back to Groq`);
            try {
                this.logger.debug('Attempting to generate suggestion with Groq');
                const result = await Promise.race([
                    this.fallbackProvider.generateSuggestion(input),
                    this.timeout(30000),
                ]);
                this.logger.debug('Successfully generated suggestion with Groq');
                return result;
            }
            catch (fallbackError) {
                this.logger.error(`Both OpenAI and Groq failed: ${fallbackError instanceof Error
                    ? fallbackError.message
                    : String(fallbackError)}`);
                return this.mockSuggestion(input);
            }
        }
    }
    timeout(ms) {
        return new Promise((_, reject) => setTimeout(() => reject(new Error(`LLM request timeout after ${ms}ms`)), ms));
    }
    mockSuggestion(input) {
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
exports.FallbackLlmProvider = FallbackLlmProvider;
exports.FallbackLlmProvider = FallbackLlmProvider = FallbackLlmProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FallbackLlmProvider);
//# sourceMappingURL=fallback-llm.provider.js.map