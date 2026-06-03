import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../common/decorators/current-org.decorator';
import {
  CurrentUser,
  RequestUser,
} from '../../common/decorators/current-user.decorator';
import { ConversationsService } from './conversations.service';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiBearerAuth()
@ApiTags('conversations')
@Controller('tickets/:ticketId/messages')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get the ordered message thread for a ticket' })
  findTicketMessages(
    @CurrentOrg() orgId: string,
    @Param('ticketId') ticketId: string,
  ) {
    return this.conversationsService.findTicketMessages(orgId, ticketId);
  }

  @Post()
  @ApiOperation({ summary: 'Post an outbound agent reply to a ticket' })
  createAgentReply(
    @CurrentOrg() orgId: string,
    @CurrentUser() user: RequestUser,
    @Param('ticketId') ticketId: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.conversationsService.createAgentReply(
      orgId,
      ticketId,
      dto,
      user,
    );
  }
}
