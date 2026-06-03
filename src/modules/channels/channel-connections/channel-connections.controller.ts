import { Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../../common/decorators/current-org.decorator';
import { OrgGuard } from '../../../common/guards/org.guard';
import { ChannelConnectionsService } from './channel-connections.service';
import { ListConnectionsDto } from './dto/list-connections.dto';
import type { Channel } from '../../../generated/prisma/enums';

@ApiTags('channels')
@UseGuards(OrgGuard)
@Controller('channels')
export class ChannelConnectionsController {
  constructor(private readonly connectionsService: ChannelConnectionsService) {}

  @Get()
  @ApiOperation({ summary: 'List all channel connections for the org' })
  list(@CurrentOrg() orgId: string, @Query() query: ListConnectionsDto) {
    return this.connectionsService.list(orgId, query);
  }

  @Get(':channel')
  @ApiOperation({ summary: 'Get a specific channel connection' })
  get(@CurrentOrg() orgId: string, @Param('channel') channel: string) {
    return this.connectionsService.get(orgId, channel as Channel);
  }

  @Delete(':channel')
  @ApiOperation({ summary: 'Disconnect a channel' })
  delete(@CurrentOrg() orgId: string, @Param('channel') channel: string) {
    return this.connectionsService.delete(orgId, channel as Channel);
  }

  @Patch(':channel/toggle')
  @ApiOperation({ summary: 'Toggle channel status between ACTIVE and PENDING' })
  toggle(
    @CurrentOrg() orgId: string,
    @Param('channel') channel: string,
    @Query('active') active: string,
  ) {
    const status = active === 'true' ? 'ACTIVE' : 'PENDING';
    return this.connectionsService.update(orgId, channel as Channel, {}, status);
  }
}
