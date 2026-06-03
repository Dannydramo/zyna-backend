import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Channel, TicketPriority } from '../../../generated/prisma/enums';

export class CreateTicketDto {
  @ApiProperty({ description: 'Customer full name' })
  @IsString()
  @MinLength(1)
  customerName!: string;

  @ApiProperty({ description: 'Customer email address' })
  @IsEmail()
  customerEmail!: string;

  @ApiProperty({ description: 'Ticket subject / title' })
  @IsString()
  @MinLength(1)
  subject!: string;

  @ApiProperty({ description: 'First inbound message body' })
  @IsString()
  @MinLength(1)
  firstMessage!: string;

  @ApiProperty({ enum: Channel })
  @IsEnum(Channel)
  channel!: Channel;

  @ApiPropertyOptional({ enum: TicketPriority, default: TicketPriority.NORMAL })
  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
