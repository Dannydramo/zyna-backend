import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../common/decorators/current-org.decorator';
import { CurrentUser, type RequestUser } from '../../common/decorators/current-user.decorator';
import { OrgGuard } from '../../common/guards/org.guard';
import { RolesGuard, Roles } from '../../common/guards/roles.guard';
import { TicketsService } from './tickets.service';
import { ListTicketsDto } from './dto/list-tickets.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TransitionTicketDto } from './dto/transition-ticket.dto';
import { AssignTicketDto } from './dto/assign-ticket.dto';

@ApiTags('tickets')
@UseGuards(OrgGuard, RolesGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @ApiOperation({
    summary: 'List tickets with pagination, filters, and search',
  })
  findAll(
    @CurrentOrg() orgId: string,
    @CurrentUser() user: RequestUser,
    @Query() query: ListTicketsDto,
  ) {
    return this.ticketsService.findAll(orgId, user, query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single ticket with its conversation and messages',
  })
  findOne(@CurrentOrg() orgId: string, @Param('id') id: string) {
    return this.ticketsService.findOne(orgId, id);
  }

  @Post()
  @ApiOperation({
    summary:
      'Create a ticket (upserts customer, creates conversation + first message)',
  })
  create(@CurrentOrg() orgId: string, @Body() dto: CreateTicketDto) {
    return this.ticketsService.create(orgId, dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update ticket status, priority, tags, or assignee',
  })
  update(
    @CurrentOrg() orgId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(orgId, id, dto);
  }

  @Post(':id/transition')
  @ApiOperation({
    summary: 'Transition a ticket status with lifecycle validation',
  })
  transition(
    @CurrentOrg() orgId: string,
    @Param('id') id: string,
    @Body() dto: TransitionTicketDto,
  ) {
    return this.ticketsService.transition(orgId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft-delete a ticket' })
  remove(@CurrentOrg() orgId: string, @Param('id') id: string) {
    return this.ticketsService.remove(orgId, id);
  }

  @Patch(':id/assign')
  @Roles(['ADMIN'])
  @ApiOperation({
    summary: 'Assign a ticket to an agent (Admin only)',
  })
  assign(
    @CurrentOrg() orgId: string,
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: AssignTicketDto,
  ) {
    return this.ticketsService.assign(orgId, id, dto, user);
  }
}
