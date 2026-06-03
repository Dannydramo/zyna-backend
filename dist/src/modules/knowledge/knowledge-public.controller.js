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
exports.KnowledgePublicController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const prisma_service_1 = require("../../prisma/prisma.service");
let KnowledgePublicController = class KnowledgePublicController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getArticle(id) {
        const article = await this.prisma.knowledgeArticle.findUnique({
            where: { id },
        });
        if (!article) {
            throw new common_1.NotFoundException(`Article ${id} not found`);
        }
        return { data: article };
    }
};
exports.KnowledgePublicController = KnowledgePublicController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get a public knowledge article by ID (no auth required)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KnowledgePublicController.prototype, "getArticle", null);
exports.KnowledgePublicController = KnowledgePublicController = __decorate([
    (0, swagger_1.ApiTags)('knowledge-public'),
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KnowledgePublicController);
//# sourceMappingURL=knowledge-public.controller.js.map