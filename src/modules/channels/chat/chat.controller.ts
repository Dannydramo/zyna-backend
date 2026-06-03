import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../../common/decorators/current-org.decorator';
import { OrgGuard } from '../../../common/guards/org.guard';
import { ChannelConnectionsService } from '../channel-connections/channel-connections.service';
import { ConfigureChatDto } from './dto/configure-chat.dto';

@ApiTags('channels-chat')
@UseGuards(OrgGuard)
@Controller('channels/chat')
export class ChatController {
  constructor(private readonly connectionsService: ChannelConnectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update chat widget configuration' })
  async configure(@CurrentOrg() orgId: string, @Body() dto: ConfigureChatDto) {
    const config = {
      widgetId: `widget-${orgId}-${Date.now()}`,
      brandColor: dto.brandColor || '#2d4a36',
      logoUrl: dto.logoUrl,
      businessName: dto.businessName || 'Support Team',
      allowedOrigins: dto.allowedOrigins || ['*'],
    };

    const res = await this.connectionsService.update(orgId, 'CHAT', config, 'ACTIVE');

    // Generate snippet
    const cfg = res.data.config as Record<string, unknown>;
    const widgetId = cfg.widgetId as string;
    const apiUrl = process.env.API_URL || 'http://localhost:4000';
    const businessName = cfg.businessName as string;
    const brandColor = cfg.brandColor as string;
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

  @Get()
  @ApiOperation({ summary: 'Get chat widget configuration and install snippet' })
  getConfig(@CurrentOrg() orgId: string) {
    return this.connectionsService.get(orgId, 'CHAT').then((res) => {
      const cfg = res.data.config as Record<string, unknown>;
      const widgetId = cfg.widgetId as string;
      const apiUrl = process.env.API_URL || 'http://localhost:4000';
      const businessName = cfg.businessName as string;
      const brandColor = cfg.brandColor as string;
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

  @Delete()
  @ApiOperation({ summary: 'Delete chat widget' })
  disconnect(@CurrentOrg() orgId: string) {
    return this.connectionsService.delete(orgId, 'CHAT');
  }
}
