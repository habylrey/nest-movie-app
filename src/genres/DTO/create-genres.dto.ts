import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateGenresDto {
  @ApiProperty({ description: 'Название жанра', example: 'Комедия' })
  @IsNotEmpty()
  @IsString()
  name: string;
}