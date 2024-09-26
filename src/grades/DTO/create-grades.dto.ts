   
import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';


export class CreateGradeDto extends BaseDto{
  
    @IsInt()
    @IsOptional()
    seriesId: number | null;
  
    @IsInt()
    @IsOptional()
    movieId: number | null;
  
    @IsInt()
    @IsNotEmpty()
    userId: number;
  
    @IsNotEmpty()
    @IsInt()
    grade: number;
  
  }