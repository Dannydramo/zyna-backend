import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class ConfigureChatDto {
  @ApiPropertyOptional({ description: 'Brand color (hex)' })
  @IsOptional()
  @IsString()
  brandColor?: string;

  @ApiPropertyOptional({ description: 'Business/Organization name' })
  @IsOptional()
  @IsString()
  businessName?: string;

  @ApiPropertyOptional({ description: 'Logo URL' })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional({ description: 'Allowed origins for CORS' })
  @IsOptional()
  @IsArray()
  allowedOrigins?: string[];
}
