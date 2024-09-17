import { Controller, Get, Param, Post, Body, Delete, Res, Query } from '@nestjs/common';
import { MovieService } from './movies.service';
import { Movie } from './DTO/movies.entity';

@Controller('movie')
export class MoviesController {
    constructor(private readonly movieService: MovieService) {}
    @Get()
    findAll() {
        return this.movieService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Movie> {
      return this.movieService.findOne(id);
    }
    // @Get('all')
    // async getAllMovies(
    //   @Query('genre_id') genre_id?: any,
    //   @Query('director_id') director_id?: any
    // ): Promise<Movie[]> {
    //   return this.movieService.getByData(genre_id, director_id);
    // }

} 