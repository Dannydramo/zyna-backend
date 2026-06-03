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
exports.IngestionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_org_decorator_1 = require("../../common/decorators/current-org.decorator");
const inbound_email_dto_1 = require("./dto/inbound-email.dto");
const send_email_dto_1 = require("./dto/send-email.dto");
const ingestion_service_1 = require("./ingestion.service");
let IngestionController = class IngestionController {
    constructor(ingestionService) {
        this.ingestionService = ingestionService;
    }
    ingestEmail(orgId, dto) {
        return this.ingestionService.ingestEmail(orgId, dto);
    }
    sendEmail(dto) {
        return this.ingestionService.sendEmail(dto);
    }
};
exports.IngestionController = IngestionController;
__decorate([
    (0, common_1.Post)('email/webhook'),
    (0, swagger_1.ApiOperation)({ summary: 'Ingest an inbound email webhook payload' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inbound_email_dto_1.InboundEmailDto]),
    __metadata("design:returntype", void 0)
], IngestionController.prototype, "ingestEmail", null);
__decorate([
    (0, common_1.Post)('email/send'),
    (0, swagger_1.ApiOperation)({ summary: 'Send an outbound support email' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_email_dto_1.SendEmailDto]),
    __metadata("design:returntype", void 0)
], IngestionController.prototype, "sendEmail", null);
exports.IngestionController = IngestionController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('ingestion'),
    (0, common_1.Controller)('ingestion'),
    __metadata("design:paramtypes", [ingestion_service_1.IngestionService])
], IngestionController);
//# sourceMappingURL=ingestion.controller.js.map