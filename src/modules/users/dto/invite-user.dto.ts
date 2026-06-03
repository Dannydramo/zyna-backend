import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../../../generated/prisma/enums';

export class InviteUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User role',
    enum: ['ADMIN', 'AGENT', 'VIEWER'],
    example: 'AGENT',
  })
  @IsEnum(['ADMIN', 'AGENT', 'VIEWER'])
  role: UserRole;
}
