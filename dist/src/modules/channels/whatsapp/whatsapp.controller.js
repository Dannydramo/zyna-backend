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
exports.WhatsAppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_org_decorator_1 = require("../../../common/decorators/current-org.decorator");
const org_guard_1 = require("../../../common/guards/org.guard");
const channel_connections_service_1 = require("../channel-connections/channel-connections.service");
const connect_whatsapp_dto_1 = require("./dto/connect-whatsapp.dto");
let WhatsAppController = class WhatsAppController {
    constructor(connectionsService) {
        this.connectionsService = connectionsService;
    }
    connect(orgId, dto) {
        return this.connectionsService.update(orgId, 'WHATSAPP', {
            phoneNumberId: dto.phoneNumberId,
            displayPhoneNumber: dto.displayPhoneNumber,
            accessTokenRef: `whatsapp-token-${Date.now()}`,
        }, 'ACTIVE');
    }
    getConnection(orgId) {
        return this.connectionsService.get(orgId, 'WHATSAPP');
    }
    disconnect(orgId) {
        return this.connectionsService.delete(orgId, 'WHATSAPP');
    }
};
exports.WhatsAppController = WhatsAppController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Connect a WhatsApp Business number' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, connect_whatsapp_dto_1.ConnectWhatsAppDto]),
    __metadata("design:returntype", void 0)
], WhatsAppController.prototype, "connect", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current WhatsApp connection' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WhatsAppController.prototype, "getConnection", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Disconnect WhatsApp' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WhatsAppController.prototype, "disconnect", null);
exports.WhatsAppController = WhatsAppController = __decorate([
    (0, swagger_1.ApiTags)('channels-whatsapp'),
    (0, common_1.UseGuards)(org_guard_1.OrgGuard),
    (0, common_1.Controller)('channels/whatsapp'),
    __metadata("design:paramtypes", [channel_connections_service_1.ChannelConnectionsService])
], WhatsAppController);
//# sourceMappingURL=whatsapp.controller.js.map