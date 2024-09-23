import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Genres } from './genres.entity';
import { CreateGenresDto } from './DTO/create-genres.dto';
@Controller('genres')
export class GenresController {
    constructor(private   genresService: GenresService) {}
    @Get()
    findAll() {
        return this.genresService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Genres> {
      return this.genresService.findOne(id);
    }
    @Post('genres')
    createGenres(@Body() createGenresDto: CreateGenresDto) {
        return this.genresService.create(createGenresDto);
    }
}