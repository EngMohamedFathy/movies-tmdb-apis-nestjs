import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty({
    description: 'Email address (use this for test)',
    example: 'admin@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password (use this for test)',
    example: '123456',
  })
  @IsString()
  @MinLength(6)
  password: string;
}