import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

const currentTime = () => new Date().toISOString();
export class CreateFavoritesDto {
      @Expose({ name: 'user_id' })
      @IsNotEmpty()
      userId: number;
    
      @Expose({ name: 'series_id' })
      @IsOptional()
      seriesId: number | null;
    
      @Expose({ name: 'movie_id' })
      @IsOptional()
      movieId: number | null;
    
      @Expose({ name: 'grade_id' })
      @IsNotEmpty()
      gradeId: number;
    
      @Transform(() => currentTime())
      createdAt: string;
    
      @Transform(() => currentTime())
      updatedAt: string;
    
      @Transform(() => null)
      @IsOptional()
      deletedAt: string | null;
    }