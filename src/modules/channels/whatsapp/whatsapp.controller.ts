import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../../common/decorators/current-org.decorator';
import { OrgGuard } from '../../../common/guards/org.guard';
import { ChannelConnectionsService } from '../channel-connections/channel-connections.service';
import { ConnectWhatsAppDto } from './dto/connect-whatsapp.dto';

@ApiTags('channels-whatsapp')
@UseGuards(OrgGuard)
@Controller('channels/whatsapp')
export class WhatsAppController {
  constructor(private readonly connectionsService: ChannelConnectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Connect a WhatsApp Business number' })
  connect(@CurrentOrg() orgId: string, @Body() dto: ConnectWhatsAppDto) {
    return this.connectionsService.update(
      orgId,
      'WHATSAPP',
      {
        phoneNumberId: dto.phoneNumberId,
        displayPhoneNumber: dto.displayPhoneNumber,
        accessTokenRef: `whatsapp-token-${Date.now()}`, // In production, encrypt token in separate table
      },
      'ACTIVE', // Skip verification for sandbox; production requires provider validation
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get current WhatsApp connection' })
  getConnection(@CurrentOrg() orgId: string) {
    return this.connectionsService.get(orgId, 'WHATSAPP');
  }

  @Delete()
  @ApiOperation({ summary: 'Disconnect WhatsApp' })
  disconnect(@CurrentOrg() orgId: string) {
    return this.connectionsService.delete(orgId, 'WHATSAPP');
  }
}
