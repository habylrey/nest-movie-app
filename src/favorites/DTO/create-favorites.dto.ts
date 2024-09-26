   
import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateFavoritesDto extends BaseDto {
      @IsInt()
      @IsNotEmpty()
      userId: number;
    
      @IsInt()
      @IsOptional()
      seriesId: number | null;
    
      @IsOptional()
      @IsInt()
      movieId: number | null;
    
      @IsNotEmpty()
      @IsInt()
      gradeId: number;
    }