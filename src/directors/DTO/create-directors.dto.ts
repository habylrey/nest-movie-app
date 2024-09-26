import { ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateDirectorsDto extends BaseDto {
  @ApiProperty({
    description: 'Идентификатор фотографии директора',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  directorPhotoId: number;

  @ApiProperty({
    description: 'Имя директора',
    example: 'Джон Смит',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Описание директора',
    example: 'Известный режиссер из Голливуда',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}