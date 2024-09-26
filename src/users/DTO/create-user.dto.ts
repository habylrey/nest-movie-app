import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateUserDto extends BaseDto {
  @ApiProperty({ description: 'ID фотографии пользователя', example: 1, required: false })
  @IsOptional()
  @IsInt()
  userPicId: number;

  @ApiProperty({ description: 'Имя пользователя', example: 'Джон Смит' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Электронная почта пользователя', example: 'john@example.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'secretpassword' })
  @IsNotEmpty()
  @IsString()
  password: string;
}