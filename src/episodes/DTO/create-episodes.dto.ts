import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { BaseDto } from '../../common/DTO/base.dto';

export class CreateEpisodesDto extends BaseDto {
  @ApiProperty({ description: 'ID файла предпросмотра', example: 1 })
  @IsNotEmpty()
  @IsInt()
  previewFileId: number;

  @ApiProperty({ description: 'ID сериала', example: 2 })
  @IsInt()
  @IsNotEmpty()
  seriesId: number;

  @ApiProperty({ description: 'Номер сезона', example: 1 })
  @IsInt()
  @IsNotEmpty()
  season: number;

  @ApiProperty({ description: 'Номер эпизода', example: 3 })
  @IsInt()
  @IsNotEmpty()
  episode: number;

  @ApiProperty({ description: 'Ссылка на эпизод', example: 'https://example.com/episode' })
  @IsString()
  @IsNotEmpty()
  episodeLink: string;

  @ApiProperty({ description: 'Описание эпизода', example: 'Захватывающий эпизод сериала' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Название эпизода', example: 'Эпизод 1' })
  @IsString()
  @IsNotEmpty()
  name: string;
}