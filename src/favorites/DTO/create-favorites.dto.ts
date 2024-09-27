import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateFavoritesDto extends BaseDto {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'ID сериала', example: 2, required: false })
  @IsInt()
  @IsOptional()
  seriesId: number | null;

  @ApiProperty({ description: 'ID фильма', example: 3, required: false })
  @IsOptional()
  @IsInt()
  movieId: number | null;

  @ApiProperty({ description: 'ID оценки', example: 4 })
  @IsNotEmpty()
  @IsInt()
  gradeId: number;
}