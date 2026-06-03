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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_org_decorator_1 = require("../../common/decorators/current-org.decorator");
const accept_suggestion_dto_1 = require("./dto/accept-suggestion.dto");
const ai_service_1 = require("./ai.service");
let AiController = class AiController {
    constructor(aiService) {
        this.aiService = aiService;
    }
    getSuggestion(orgId, ticketId) {
        return this.aiService.getSuggestion(orgId, ticketId);
    }
    suggest(orgId, ticketId) {
        return this.aiService.suggest(orgId, ticketId);
    }
    accept(orgId, ticketId, dto) {
        return this.aiService.accept(orgId, ticketId, dto.suggestionId);
    }
    reject(orgId, suggestionId) {
        return this.aiService.reject(orgId, suggestionId);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Get)('suggestion'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the latest AI suggestion for a ticket' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Param)('ticketId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "getSuggestion", null);
__decorate([
    (0, common_1.Post)('suggest'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually trigger an AI reply suggestion' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Param)('ticketId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "suggest", null);
__decorate([
    (0, common_1.Post)('accept'),
    (0, swagger_1.ApiOperation)({ summary: 'Accept the latest or specified AI suggestion' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Param)('ticketId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, accept_suggestion_dto_1.AcceptSuggestionDto]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "accept", null);
__decorate([
    (0, common_1.Post)('suggestions/:suggestionId/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject an AI suggestion' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Param)('suggestionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "reject", null);
exports.AiController = AiController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('ai'),
    (0, common_1.Controller)('tickets/:ticketId/ai'),
    __metadata("design:paramtypes", [ai_service_1.AiService])
], AiController);
//# sourceMappingURL=ai.controller.js.map