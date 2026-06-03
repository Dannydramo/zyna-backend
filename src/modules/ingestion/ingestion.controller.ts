import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../common/decorators/current-org.decorator';
import { InboundEmailDto } from './dto/inbound-email.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { IngestionService } from './ingestion.service';

@ApiBearerAuth()
@ApiTags('ingestion')
@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('email/webhook')
  @ApiOperation({ summary: 'Ingest an inbound email webhook payload' })
  ingestEmail(@CurrentOrg() orgId: string, @Body() dto: InboundEmailDto) {
    return this.ingestionService.ingestEmail(orgId, dto);
  }

  @Post('email/send')
  @ApiOperation({ summary: 'Send an outbound support email' })
  sendEmail(@Body() dto: SendEmailDto) {
    return this.ingestionService.sendEmail(dto);
  }
}
