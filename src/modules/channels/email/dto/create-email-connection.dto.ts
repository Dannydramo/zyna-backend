import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmailConnectionDto {
  @ApiProperty({ description: 'The sending domain (e.g. example.com)' })
  @IsString()
  @MinLength(1)
  domain!: string;

  @ApiProperty({ description: 'The sending email address (e.g. support@example.com)' })
  @IsEmail()
  fromAddress!: string;

  @ApiProperty({ description: 'The display name for outbound emails' })
  @IsString()
  @MinLength(1)
  fromName!: string;

  @ApiProperty({ description: 'IMAP host for receiving emails (e.g. imap.gmail.com)', required: false })
  @IsOptional()
  @IsString()
  imapHost?: string;

  @ApiProperty({ description: 'IMAP port (default 993)', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  imapPort?: number;

  @ApiProperty({ description: 'Use SSL/TLS for IMAP (default true)', required: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  imapSecure?: boolean;

  @ApiProperty({ description: 'IMAP username (default: fromAddress)', required: false })
  @IsOptional()
  @IsString()
  imapUser?: string;

  @ApiProperty({ description: 'IMAP password', required: false })
  @IsOptional()
  @IsString()
  imapPass?: string;

  @ApiProperty({ description: 'SMTP host for sending emails (e.g. smtp.gmail.com)', required: false })
  @IsOptional()
  @IsString()
  smtpHost?: string;

  @ApiProperty({ description: 'SMTP port (typically 465 for SSL or 587 for TLS)', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  smtpPort?: number;

  @ApiProperty({ description: 'Use SSL/TLS for SMTP (default true)', required: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  smtpSecure?: boolean;

  @ApiProperty({ description: 'SMTP username (default: fromAddress)', required: false })
  @IsOptional()
  @IsString()
  smtpUser?: string;

  @ApiProperty({ description: 'SMTP password (your email account password)', required: false })
  @IsOptional()
  @IsString()
  smtpPass?: string;
}
