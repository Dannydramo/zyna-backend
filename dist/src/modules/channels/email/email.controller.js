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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_org_decorator_1 = require("../../../common/decorators/current-org.decorator");
const org_guard_1 = require("../../../common/guards/org.guard");
const email_verification_service_1 = require("./email-verification.service");
const create_email_connection_dto_1 = require("./dto/create-email-connection.dto");
let EmailController = class EmailController {
    constructor(verificationService) {
        this.verificationService = verificationService;
    }
    createConnection(orgId, dto) {
        return this.verificationService.createVerification(orgId, dto);
    }
    verify(orgId) {
        return this.verificationService.verifyConnection(orgId);
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create/update email channel connection and generate DNS records for verification',
    }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_email_connection_dto_1.CreateEmailConnectionDto]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "createConnection", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verify DNS records and activate email channel (calls provider verify API)',
    }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "verify", null);
exports.EmailController = EmailController = __decorate([
    (0, swagger_1.ApiTags)('channels-email'),
    (0, common_1.UseGuards)(org_guard_1.OrgGuard),
    (0, common_1.Controller)('channels/email'),
    __metadata("design:paramtypes", [email_verification_service_1.EmailVerificationService])
], EmailController);
//# sourceMappingURL=email.controller.js.map