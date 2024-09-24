import { Controller, Get, Param, Body, Post, ParseIntPipe } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Genres } from './genres.entity';
import { CreateGenresDto } from './DTO/create-genres.dto';
import { IdDto } from '../common/DTO/id.dto'; 

@Controller('genres')
export class GenresController {
    constructor(private   genresService: GenresService) {}
    @Get()
    findAll() {
        return this.genresService.findAll()
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Genres> {
        const idDto = new IdDto();
        idDto.id = id;
      return this.genresService.findOne(idDto);
    }
    @Post('genres')
    createGenres(@Body() createGenresDto: CreateGenresDto) {
        return this.genresService.create(createGenresDto);
    }
}