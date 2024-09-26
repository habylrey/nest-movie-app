   
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateEpisodesDto extends BaseDto{
      @IsNotEmpty()
      @IsInt()
      previewFileId: number;
    
      @IsInt()
      @IsNotEmpty()
      seriesId: number;
    
      @IsInt()
      @IsNotEmpty()
      season: number;
    
      @IsInt()
      @IsNotEmpty()
      episode: number;
    
      @IsString()
      @IsNotEmpty()
      episodeLink: string;
    
      @IsString()
      @IsNotEmpty()
      description: string;
    
      @IsString()
      @IsNotEmpty()
      name: string;
    
    }
    
    