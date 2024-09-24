   
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateDirectorsDto extends BaseDto {
  @IsNotEmpty()
  @IsInt()
  directorPhotoId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
  
}
