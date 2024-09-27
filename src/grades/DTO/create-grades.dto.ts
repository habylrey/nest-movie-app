import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateGradeDto {
  @ApiProperty({ description: 'ID сериала', example: 1, required: false })
  @IsInt()
  @IsOptional()
  seriesId: number | null;

  @ApiProperty({ description: 'ID фильма', example: 2, required: false })
  @IsInt()
  @IsOptional()
  movieId: number | null;

  @ApiProperty({ description: 'ID пользователя', example: 3 })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Оценка', example: 4 })
  @IsNotEmpty()
  @IsInt()
  grade: number;
}