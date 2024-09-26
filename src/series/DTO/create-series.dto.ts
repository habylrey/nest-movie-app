import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateSeriesDto extends BaseDto {
  @ApiProperty({ description: 'Название сериала', example: 'Игра престолов' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Описание сериала', example: 'Фэнтези сериал' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'ID файла постера', example: 1, required: false })
  @IsOptional()
  @IsInt()
  poster_file_id: number;

  @ApiProperty({ description: 'Год начала', example: 2011 })
  @IsNotEmpty()
  @IsInt()
  start_year: number;

  @ApiProperty({ description: 'Год окончания', example: 2019, required: false })
  @IsOptional()
  @IsInt()
  grad_year: number;

  @ApiProperty({ description: 'ID жанра', example: 2 })
  @IsNotEmpty()
  @IsInt()
  genre_id: number;
}