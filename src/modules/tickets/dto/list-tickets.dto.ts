import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import {
  AiStatus,
  Channel,
  TicketPriority,
  TicketStatus,
} from '../../../generated/prisma/enums';

export type TicketTab = 'all' | 'assigned' | 'unassigned' | 'ai-handled';

export class ListTicketsDto extends PaginationDto {
  @ApiPropertyOptional({
    enum: ['all', 'assigned', 'unassigned', 'ai-handled'],
    description: 'Filter tickets by category',
  })
  @IsOptional()
  @IsString()
  tab?: TicketTab;

  @ApiPropertyOptional({ enum: TicketStatus })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @ApiPropertyOptional({ enum: Channel })
  @IsOptional()
  @IsEnum(Channel)
  channel?: Channel;

  @ApiPropertyOptional({ enum: TicketPriority })
  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @ApiPropertyOptional({ enum: AiStatus })
  @IsOptional()
  @IsEnum(AiStatus)
  aiStatus?: AiStatus;

  @ApiPropertyOptional({ description: 'Filter by assignee ID' })
  @IsOptional()
  @IsString()
  assigneeId?: string;

  @ApiPropertyOptional({
    description: 'Search by subject, customer name, or email',
  })
  @IsOptional()
  @IsString()
  q?: string;
}
