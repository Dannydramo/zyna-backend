import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public.decorator';
import { PrismaService } from '../../../prisma/prisma.service';
import { IngestionService } from '../../ingestion/ingestion.service';
import type { InboundEmailDto } from '../../ingestion/dto/inbound-email.dto';

@ApiTags('email-ingestion')
@Controller('ingest/email')
export class EmailIngestionController {
  constructor(
    private readonly ingestionService: IngestionService,
    private readonly prisma: PrismaService,
  ) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Inbound email webhook (multi-tenant routing by recipient)' })
  async ingestEmail(@Body() dto: InboundEmailDto) {
    // Find the org that owns this receiving address
    // The email was sent to `toAddress` which should match ChannelConnection.config.inboundRoutingAddress
    const toAddress = dto.toAddress || dto.fromEmail; // fallback if not provided

    // Find connection by inboundRoutingAddress in config JSON
    // Note: Prisma JSON field filtering can be tricky; we'll load and filter in memory for now
    const allConnections = await this.prisma.channelConnection.findMany({
      where: { channel: 'EMAIL' },
    });

    const connection = allConnections.find((c) => {
      const cfg = c.config as Record<string, unknown>;
      return (cfg.inboundRoutingAddress as string)?.toLowerCase() === toAddress.toLowerCase();
    });

    if (!connection) {
      throw new BadRequestException(
        `No email channel configured for recipient ${toAddress}`,
      );
    }

    // Ingest on behalf of the organization that owns this address
    return this.ingestionService.ingestEmail(connection.organizationId, dto);
  }
}
