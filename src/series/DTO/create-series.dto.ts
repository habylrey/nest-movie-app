import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';


export class CreateSeriesDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    poster_file_id: number;
    
    @IsNotEmpty()
    start_year: number;
    
    @IsNotEmpty()
    grad_year: number;

    @IsNotEmpty()
    genre_id: number;
    

}
