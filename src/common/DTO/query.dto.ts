import { IsNumber, IsOptional, IsPositive, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class EpisodeQueryDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  season?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  episode?: number;
}

export class MovieQueryDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  genreId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  directorId?: number;
}