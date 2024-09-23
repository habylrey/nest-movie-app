import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

const currentTime = () => new Date().toISOString();

export class CreateDirectorsDto {
  @Expose({ name: 'director_photo_id' })
  @IsNotEmpty()
  directorPhotoId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
  
}
