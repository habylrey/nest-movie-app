   
import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateMoviesDto extends BaseDto {
      @IsNotEmpty()
      @IsString()
      name: string;
    
      @IsNotEmpty()
      description: string;
    
      @IsNotEmpty()
      @IsInt()
      posterFileId: number;
    
      @IsNotEmpty()
      @IsString()
      directorId: number;
    
      @IsNotEmpty()
      @IsString()
      genreId: number;
    
      @IsNotEmpty()
      @IsString()
      link: string;
    
   
    }
    