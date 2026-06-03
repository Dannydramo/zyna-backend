import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class AssignTicketDto {
  @ApiProperty({
    description: 'User ID to assign the ticket to',
    example: 'user_alex',
  })
  @IsString()
  assigneeId: string;

  @ApiPropertyOptional({
    description: 'Optional reason for the assignment',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
