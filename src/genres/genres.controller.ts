import { Controller, Get, Param, Body, Post, ParseIntPipe, Query } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Genres } from './genres.entity';
import { CreateGenresDto } from './DTO/create-genres.dto';
import { IdDto } from '../common/DTO/id.dto'; 

@Controller('genres')
export class GenresController {
    constructor(private genresService: GenresService) {}
    @Get()
    findAll() {
        return this.genresService.findAll()
    }
    @Get('find')
    findOne(@Query() query: IdDto): Promise<Genres> {
      return this.genresService.findOne(query);
    }
    @Post('genres')
    createGenres(@Body() createGenresDto: CreateGenresDto) {
        return this.genresService.create(createGenresDto);
    }
}