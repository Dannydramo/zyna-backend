import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../common/decorators/current-org.decorator';
import { AcceptSuggestionDto } from './dto/accept-suggestion.dto';
import { AiService } from './ai.service';

@ApiBearerAuth()
@ApiTags('ai')
@Controller('tickets/:ticketId/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('suggestion')
  @ApiOperation({ summary: 'Get the latest AI suggestion for a ticket' })
  getSuggestion(
    @CurrentOrg() orgId: string,
    @Param('ticketId') ticketId: string,
  ) {
    return this.aiService.getSuggestion(orgId, ticketId);
  }

  @Post('suggest')
  @ApiOperation({ summary: 'Manually trigger an AI reply suggestion' })
  suggest(@CurrentOrg() orgId: string, @Param('ticketId') ticketId: string) {
    return this.aiService.suggest(orgId, ticketId);
  }

  @Post('accept')
  @ApiOperation({ summary: 'Accept the latest or specified AI suggestion' })
  accept(
    @CurrentOrg() orgId: string,
    @Param('ticketId') ticketId: string,
    @Body() dto: AcceptSuggestionDto,
  ) {
    return this.aiService.accept(orgId, ticketId, dto.suggestionId);
  }

  @Post('suggestions/:suggestionId/reject')
  @ApiOperation({ summary: 'Reject an AI suggestion' })
  reject(
    @CurrentOrg() orgId: string,
    @Param('suggestionId') suggestionId: string,
  ) {
    return this.aiService.reject(orgId, suggestionId);
  }
}
