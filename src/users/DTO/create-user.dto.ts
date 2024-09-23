import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
   @Expose({ name: 'user_pic_id' })

   @IsNotEmpty()
   userPicId: number;
      
   @IsNotEmpty()
   name: string;

   @IsNotEmpty()
   email: string;
   
   @IsNotEmpty()
   password: string;

} 