import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class InboundEmailDto {
  @ApiProperty()
  @IsEmail()
  fromEmail!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  toAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fromName?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  subject!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  messageId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  threadId?: string;
}
