import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateMoviesDto {
  @ApiProperty({ description: 'Название фильма', example: 'Матрица' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Описание фильма', example: 'Научно-фантастический фильм' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'ID файла постера', example: 1 })
  @IsNotEmpty()
  @IsInt()
  posterFileId: number;

  @ApiProperty({ description: 'ID режиссера', example: 2 })
  @IsNotEmpty()
  @IsString()
  directorId: number;

  @ApiProperty({ description: 'ID жанра', example: 3 })
  @IsNotEmpty()
  @IsString()
  genreId: number;

  @ApiProperty({ description: 'Ссылка на фильм', example: 'https://example.com/movie' })
  @IsNotEmpty()
  @IsString()
  link: string;
}