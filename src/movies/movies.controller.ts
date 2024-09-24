import { Controller, Get, Param, Post, Body, Query, ParseIntPipe } from '@nestjs/common';
import { MovieService } from './movies.service';
import { Movie } from './movies.entity';
import { CreateMoviesDto } from './DTO/create-movies.dto';
import { IdDto } from '../common/DTO/id.dto'; 
import { MovieQueryDto } from '../common/DTO/query.dto';

@Controller('movie')
export class MoviesController {
  constructor(private readonly movieService: MovieService,) {}

  @Get()
  findAll(@Query() query: MovieQueryDto) {
    return this.movieService.findAll(query.genreId, query.directorId);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    const idDto = new IdDto();
    idDto.id = id;
    return this.movieService.findOne(idDto);
  }

  @Post('admin')
  createMovie(@Body() createMoviesDto: CreateMoviesDto) {
    return this.movieService.create(createMoviesDto);
  }
}