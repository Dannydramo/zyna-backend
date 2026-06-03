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
exports.EmailIngestionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const prisma_service_1 = require("../../../prisma/prisma.service");
const ingestion_service_1 = require("../../ingestion/ingestion.service");
let EmailIngestionController = class EmailIngestionController {
    constructor(ingestionService, prisma) {
        this.ingestionService = ingestionService;
        this.prisma = prisma;
    }
    async ingestEmail(dto) {
        const toAddress = dto.toAddress || dto.fromEmail;
        const allConnections = await this.prisma.channelConnection.findMany({
            where: { channel: 'EMAIL' },
        });
        const connection = allConnections.find((c) => {
            const cfg = c.config;
            return cfg.inboundRoutingAddress?.toLowerCase() === toAddress.toLowerCase();
        });
        if (!connection) {
            throw new common_1.BadRequestException(`No email channel configured for recipient ${toAddress}`);
        }
        return this.ingestionService.ingestEmail(connection.organizationId, dto);
    }
};
exports.EmailIngestionController = EmailIngestionController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Inbound email webhook (multi-tenant routing by recipient)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], EmailIngestionController.prototype, "ingestEmail", null);
exports.EmailIngestionController = EmailIngestionController = __decorate([
    (0, swagger_1.ApiTags)('email-ingestion'),
    (0, common_1.Controller)('ingest/email'),
    __metadata("design:paramtypes", [ingestion_service_1.IngestionService,
        prisma_service_1.PrismaService])
], EmailIngestionController);
//# sourceMappingURL=email-ingestion.controller.js.map