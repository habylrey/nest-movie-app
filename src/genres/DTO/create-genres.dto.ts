import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

const currentTime = () => new Date().toISOString();

export class CreateGenresDto {
    @IsNotEmpty()
    name: string;
  
    @Transform(() => currentTime())
    createdAt: string;
  
    @Transform(() => currentTime())
    updatedAt: string;
  
    @Transform(() => null)
    @IsOptional()
    deletedAt: string | null;
  }