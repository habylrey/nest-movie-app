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
  @Get('find')
  findOne(@Query('id', ParseIntPipe) id: number): Promise<Movie> {
    
    return this.movieService.  findOne(new IdDto(id));
  }

  @Post('admin')
  createMovie(@Body() createMoviesDto: CreateMoviesDto) {
    return this.movieService.create(createMoviesDto);
  }
}