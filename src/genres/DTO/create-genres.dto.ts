   
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';


export class CreateGenresDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
  }