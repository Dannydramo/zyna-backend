import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AcceptSuggestionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  suggestionId?: string;
}
