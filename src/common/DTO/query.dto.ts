import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryEpisodesDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  season?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  episode?: number;
}