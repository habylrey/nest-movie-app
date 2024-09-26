   
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateUserDto extends BaseDto {
   @IsOptional()
   @IsInt()
   userPicId: number;
      
   @IsNotEmpty()
   @IsString()
   name: string;

   @IsNotEmpty()
   @IsString()
   email: string;
   
   @IsNotEmpty()
   @IsString()
   password: string;

} 