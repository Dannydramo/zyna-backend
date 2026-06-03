import { Body, Controller, Post, BadRequestException, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../../prisma/prisma.service';
import { IngestionService } from '../../ingestion/ingestion.service';

@ApiTags('whatsapp-ingestion')
@Controller('ingest/whatsapp')
export class WhatsAppIngestionController {
  private readonly logger = new Logger(WhatsAppIngestionController.name);

  constructor(
    private readonly ingestionService: IngestionService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'WhatsApp webhook from Twilio/Meta (with multi-tenant routing)' })
  async ingestMessage(@Body() payload: Record<string, unknown>) {
    // Extract phone number from provider payload
    // Twilio: From field; Meta: wa_id field
    const phoneNumber = (payload.From || payload.wa_id) as string;

    if (!phoneNumber) {
      throw new BadRequestException('Missing phone number in webhook payload');
    }

    // Find org that owns this phone number
    const allConnections = await this.prisma.channelConnection.findMany({
      where: { channel: 'WHATSAPP' },
    });

    const connection = allConnections.find((c) => {
      const cfg = c.config as Record<string, unknown>;
      return (cfg.displayPhoneNumber as string)?.replace(/\D/g, '') === phoneNumber.replace(/\D/g, '');
    });

    if (!connection) {
      this.logger.warn(`WhatsApp webhook for unknown phone number: ${phoneNumber}`);
      throw new BadRequestException(`No WhatsApp channel configured for ${phoneNumber}`);
    }

    // Ingest as inbound message
    // In production, parse the full Twilio/Meta payload structure
    const messageBody = (payload.Body || payload.text) as string;
    const fromPhone = (payload.From || payload.wa_id) as string;

    return this.ingestionService.ingestEmail(connection.organizationId, {
      fromEmail: `${fromPhone}@whatsapp`,
      toAddress: phoneNumber,
      subject: 'WhatsApp Message',
      body: messageBody,
      messageId: `wa-${payload.MessageSid || payload.id}`,
      threadId: phoneNumber,
    } as any);
  }
}
