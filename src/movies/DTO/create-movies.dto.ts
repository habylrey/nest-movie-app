import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMoviesDto {
      @IsNotEmpty()
      name: string;
    
      @IsNotEmpty()
      description: string;
    
      @Expose({ name: 'poster_file_id' })
      @IsNotEmpty()
      posterFileId: number;
    
      @Expose({ name: 'director_id' })
      @IsNotEmpty()
      directorId: number;
    
      @Expose({ name: 'genre_id' })
      @IsNotEmpty()
      genreId: number;
    
      @IsNotEmpty()
      link: string;
    
   
    }
    