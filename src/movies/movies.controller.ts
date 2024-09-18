import { Controller, Get, Param, Post, Body, Delete, Res, Query } from '@nestjs/common';
import { MovieService } from './movies.service';
import { Movie } from './DTO/movies.entity';

@Controller('movie')
export class MoviesController {
    constructor(private readonly movieService: MovieService) {}
    @Get()
    findAll(
      @Query('genre') genre_id: number,
      @Query('director') director_id: number,
    ) {
      if (genre_id && director_id) {
        return this.movieService.findEpisodesByGenreAndDirector(director_id, genre_id)

      } else if (genre_id) {
        return this.movieService.findEpisodesByGenre(genre_id)
      } else if ( director_id ) {
        return this.movieService.findEpisodesByDirector(director_id)
      }
        return this.movieService.findAll()
    }
    @Get(':id')
    findOne(
      @Param('id') id: number,
      ): Promise<Movie> {
      return this.movieService.findOne(id);
    }

} 