import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../../common/decorators/current-org.decorator';
import { PrismaService } from '../../../prisma/prisma.service';
import { Channel } from '../../../generated/prisma/enums';

@ApiBearerAuth()
@ApiTags('channels')
@Controller('channels/whatsapp')
export class WhatsAppController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('configure')
  @ApiOperation({ summary: 'Configure WhatsApp channel' })
  async configure(
    @CurrentOrg() orgId: string,
    @Body() dto: any,
  ) {
    const { phoneNumberId, wabaId, accessToken, phoneNumber } = dto;

    if (!phoneNumberId || !wabaId || !accessToken || !phoneNumber) {
      throw new Error('Missing required fields: phoneNumberId, wabaId, accessToken, phoneNumber');
    }

    // Check if already exists
    const existing = await this.prisma.channelConnection.findFirst({
      where: { organizationId: orgId, channel: Channel.WHATSAPP },
    });

    if (existing) {
      // Update
      await this.prisma.channelConnection.update({
        where: { id: existing.id },
        data: {
          config: {
            phoneNumberId,
            wabaId,
            accessToken, // Should be encrypted
            phoneNumber,
            webhookToken: 'zyna_webhook_token', // TODO: generate unique token
          },
          status: 'ACTIVE',
        },
      });
    } else {
      // Create
      await this.prisma.channelConnection.create({
        data: {
          organizationId: orgId,
          channel: Channel.WHATSAPP,
          status: 'ACTIVE',
          config: {
            phoneNumberId,
            wabaId,
            accessToken, // Should be encrypted
            phoneNumber,
            webhookToken: 'zyna_webhook_token',
          },
        },
      });
    }

    return {
      data: {
        success: true,
        message: 'WhatsApp configured successfully',
        webhookUrl: `${process.env.API_URL || 'http://localhost:4000'}/api/v1/whatsapp/webhooks`,
        webhookToken: 'zyna_webhook_token',
      },
    };
  }
}
