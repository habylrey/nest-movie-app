import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Пароль пользователя', required: true, example: 'pass' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'Электронная почта', required: true, example: 'john@example.com' })
  @IsNotEmpty()
  @IsString()
  email: string;
}