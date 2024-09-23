import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

const currentTime = () => new Date().toISOString();


export class CreateEpisodesDto {
      @Expose({ name: 'preview_file_id' })
      @IsNotEmpty()
      previewFileId: number;
    
      @Expose({ name: 'series_id' })
      @IsNotEmpty()
      seriesId: number;
    
      @IsNotEmpty()
      season: number;
    
      @IsNotEmpty()
      episode: number;
    
      @Expose({ name: 'episode_link' })
      @IsNotEmpty()
      episodeLink: string;
    
      @IsNotEmpty()
      description: string;
    
      @IsNotEmpty()
      name: string;
    
    }
    
    