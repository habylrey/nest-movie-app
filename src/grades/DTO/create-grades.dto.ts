import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';


export class CreateGradeDto {
    @Expose({ name: 'series_id' })
    @IsOptional()
    seriesId: number | null;
  
    @Expose({ name: 'movie_id' })
    @IsOptional()
    movieId: number | null;
  
    @Expose({ name: 'user_id' })
    @IsNotEmpty()
    userId: number;
  
    @IsNotEmpty()
    grade: number;
  
  }