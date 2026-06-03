import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentOrg } from '../../common/decorators/current-org.decorator';
import {
  CurrentUser,
  RequestUser,
} from '../../common/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { AcceptInviteDto } from './dto/accept-invite.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List team users' })
  findAll(@CurrentOrg() orgId: string) {
    return this.usersService.findAll(orgId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user role or availability status' })
  update(
    @CurrentOrg() orgId: string,
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(orgId, id, dto, user);
  }

  @Post('invite')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Invite a team member to the organization' })
  invite(
    @CurrentOrg() orgId: string,
    @CurrentUser() user: RequestUser,
    @Body() dto: InviteUserDto,
  ) {
    return this.usersService.invite(orgId, dto, user);
  }

  @Post('accept-invite')
  @ApiOperation({ summary: 'Accept an invite and set password' })
  acceptInvite(@Body() dto: AcceptInviteDto) {
    return this.usersService.acceptInvite(dto);
  }
}
