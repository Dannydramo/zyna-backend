import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ConnectWhatsAppDto {
  @ApiProperty({ description: 'Twilio Account SID or Meta Business Phone Number ID' })
  @IsString()
  @MinLength(1)
  phoneNumberId!: string;

  @ApiProperty({ description: 'Access token (will be encrypted)' })
  @IsString()
  @MinLength(1)
  accessToken!: string;

  @ApiProperty({ description: 'Display phone number (e.g. +1234567890)' })
  @IsString()
  @MinLength(1)
  displayPhoneNumber!: string;
}
