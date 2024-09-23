import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { MovieService } from './movies.service';
import { Movie } from './movies.entity';
import { CreateMoviesDto } from './DTO/create-movies.dto';

@Controller('movie')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(
    @Query('genre') genreId?: number,
    @Query('director') directorId?: number,
  ) {
    return this.movieService.findAll(genreId, directorId);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Movie> {
    return this.movieService.findOne(id);
  }

  @Post('admin')
  createMovie(@Body() createMoviesDto: CreateMoviesDto) {
    return this.movieService.create(createMoviesDto);
  }
}