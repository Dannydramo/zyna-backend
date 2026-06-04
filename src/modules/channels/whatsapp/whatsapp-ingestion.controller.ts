import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public.decorator';
import { WhatsAppService } from './whatsapp.service';

@ApiTags('whatsapp')
@Controller('whatsapp')
export class WhatsAppIngestionController {
  private readonly logger = new Logger(WhatsAppIngestionController.name);

  constructor(private readonly whatsappService: WhatsAppService) {}

  @Get('webhooks')
  @Public()
  @ApiOperation({ summary: 'WhatsApp webhook verification' })
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Query('hub.verify_token') verifyToken: string,
  ) {
    this.logger.log(`[WEBHOOK_VERIFY] Mode: ${mode}, Token: ${verifyToken}`);

    if (mode === 'subscribe' && verifyToken === 'zyna_webhook_token') {
      return parseInt(challenge, 10);
    }

    return { error: 'Invalid token' };
  }

  @Post('webhooks')
  @Public()
  @ApiOperation({ summary: 'Receive incoming WhatsApp messages' })
  async handleWebhook(@Body() payload: any) {
    this.logger.log(`[WEBHOOK_RECEIVED] Payload: ${JSON.stringify(payload)}`);

    try {
      const entry = payload?.entry?.[0];
      if (!entry) return { ok: true };

      const changes = entry.changes?.[0];
      if (!changes) return { ok: true };

      const value = changes.value;
      const messages = value?.messages;
      const metadata = value?.metadata;

      if (!messages || !metadata) return { ok: true };

      const phoneNumberId = metadata.phone_number_id;
      const message = messages[0];

      if (message.type === 'text') {
        await this.whatsappService.handleIncomingMessage(
          phoneNumberId,
          message.from,
          message.text.body,
          message.id,
        );
      }

      return { ok: true };
    } catch (error) {
      this.logger.error(`[WEBHOOK_ERROR] ${error instanceof Error ? error.message : String(error)}`);
      return { ok: true };
    }
  }
}
