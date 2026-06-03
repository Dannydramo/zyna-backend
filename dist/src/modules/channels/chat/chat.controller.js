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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_org_decorator_1 = require("../../../common/decorators/current-org.decorator");
const org_guard_1 = require("../../../common/guards/org.guard");
const channel_connections_service_1 = require("../channel-connections/channel-connections.service");
const configure_chat_dto_1 = require("./dto/configure-chat.dto");
let ChatController = class ChatController {
    constructor(connectionsService) {
        this.connectionsService = connectionsService;
    }
    async configure(orgId, dto) {
        const config = {
            widgetId: `widget-${orgId}-${Date.now()}`,
            brandColor: dto.brandColor || '#2d4a36',
            logoUrl: dto.logoUrl,
            businessName: dto.businessName || 'Support Team',
            allowedOrigins: dto.allowedOrigins || ['*'],
        };
        const res = await this.connectionsService.update(orgId, 'CHAT', config, 'ACTIVE');
        const cfg = res.data.config;
        const widgetId = cfg.widgetId;
        const apiUrl = process.env.API_URL || 'http://localhost:4000';
        const businessName = cfg.businessName;
        const brandColor = cfg.brandColor;
        const installSnippet = `<!-- Zyna Chat Widget -->
<script>
  window.ZynaChatConfig = {
    widgetId: '${widgetId}',
    apiUrl: '${apiUrl}',
    businessName: '${businessName}',
    brandColor: '${brandColor}'
  };
</script>
<script src="${apiUrl}/api/v1/chat-widget.js" async></script>`;
        return { ...res, installSnippet };
    }
    getConfig(orgId) {
        return this.connectionsService.get(orgId, 'CHAT').then((res) => {
            const cfg = res.data.config;
            const widgetId = cfg.widgetId;
            const apiUrl = process.env.API_URL || 'http://localhost:4000';
            const businessName = cfg.businessName;
            const brandColor = cfg.brandColor;
            const installSnippet = `<!-- Zyna Chat Widget -->
<script>
  window.ZynaChatConfig = {
    widgetId: '${widgetId}',
    apiUrl: '${apiUrl}',
    businessName: '${businessName}',
    brandColor: '${brandColor}'
  };
</script>
<script src="${apiUrl}/api/v1/chat-widget.js" async></script>`;
            return { ...res, installSnippet };
        });
    }
    disconnect(orgId) {
        return this.connectionsService.delete(orgId, 'CHAT');
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create or update chat widget configuration' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, configure_chat_dto_1.ConfigureChatDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "configure", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get chat widget configuration and install snippet' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete chat widget' }),
    __param(0, (0, current_org_decorator_1.CurrentOrg)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "disconnect", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('channels-chat'),
    (0, common_1.UseGuards)(org_guard_1.OrgGuard),
    (0, common_1.Controller)('channels/chat'),
    __metadata("design:paramtypes", [channel_connections_service_1.ChannelConnectionsService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map