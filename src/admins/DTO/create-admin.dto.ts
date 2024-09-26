import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateAdminDto extends BaseDto {
  @ApiProperty({ description: 'ID фотографии пользователя', required: false, example: 1 })
  @IsOptional()
  @IsInt()
  userPicId: number;

  @ApiProperty({ description: 'Имя администратора', required: true, example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Электронная почта администратора', required: true, example: 'john@example.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Роль администратора', required: true, example: 'admin' })
  @IsNotEmpty()
  @IsString()
  role: string;
}