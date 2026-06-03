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
exports.ChannelConnectionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_org_decorator_1 = require("../../../common/decorators/current-org.decorator");
const org_guard_1 = require("../../../common/guards/org.guard");
const channel_connections_service_1 = require("./channel-connections.service");
const list_connections_dto_1 = require("./dto/list-connections.dto");
let ChannelConnectionsController = class ChannelConnectionsController {
    constructor(connectionsService) {
        this.connectionsService = connectionsService;
    }
    list(orgId, query) {
        return this.connectionsService.list(orgId, query);
    }
    get(orgId, channel) {
        return this.connectionsService.get(orgId, channel);
    }
    delete(orgId, channel) {
        return this.connectionsService.delete(orgId, channel);
    }
    toggle(orgId, channel, active) {
        const status = active === 'true' ? 'ACTIVE' : 'PENDING';
        return this.connectionsService.update(orgId, channel, {}, status);
    }
};
exports.ChannelConnectionsController = ChannelConnectionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all channel connections for the org' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, list_connections_dto_1.ListConnectionsDto]),
    __metadata("design:returntype", void 0)
], ChannelConnectionsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':channel'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific channel connection' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Param)('channel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChannelConnectionsController.prototype, "get", null);
__decorate([
    (0, common_1.Delete)(':channel'),
    (0, swagger_1.ApiOperation)({ summary: 'Disconnect a channel' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Param)('channel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChannelConnectionsController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':channel/toggle'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle channel status between ACTIVE and PENDING' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Param)('channel')),
    __param(2, (0, common_1.Query)('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelConnectionsController.prototype, "toggle", null);
exports.ChannelConnectionsController = ChannelConnectionsController = __decorate([
    (0, swagger_1.ApiTags)('channels'),
    (0, common_1.UseGuards)(org_guard_1.OrgGuard),
    (0, common_1.Controller)('channels'),
    __metadata("design:paramtypes", [channel_connections_service_1.ChannelConnectionsService])
], ChannelConnectionsController);
//# sourceMappingURL=channel-connections.controller.js.map