import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class EpisodeQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  season?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  episode?: number;
}
