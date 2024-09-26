   
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';


export class CreateSeriesDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsInt()
    poster_file_id: number;
    
    @IsNotEmpty()
    @IsInt()
    start_year: number;
    
    @IsOptional()
    @IsInt()
    grad_year: number;

    @IsNotEmpty()
    @IsInt()
    genre_id: number;
    

}
