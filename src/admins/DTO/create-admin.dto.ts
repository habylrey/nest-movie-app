import { IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
   @IsNotEmpty()
   userPicId: number;
      
   @IsNotEmpty()
   name: string;

   @IsNotEmpty()
   email: string;
   
   @IsNotEmpty()
   role: string;

} 