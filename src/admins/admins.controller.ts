import { Controller, Get, Post, Body, Module } from '@nestjs/common';
import { MovieService } from 'src/movies/movies.service';
import { CreateMoviesDto } from 'src/movies/DTO/create-movies.dto';
import { SeriesService } from 'src/series/series.service';
import { CreateSeriesDto } from 'src/series/DTO/create-series.dto';
import { DirectorsService } from 'src/directors/directors.service';
import { CreateDirectorsDto } from 'src/directors/DTO/create-directors.dto';
import { EpisodesService } from 'src/episodes/episodes.service';
import { GenresService } from 'src/genres/genres.service';
import { UsersService } from 'src/users/users.service';
import { CreateEpisodesDto } from 'src/episodes/DTO/create-episodes.dto';
import { CreateGenresDto } from 'src/genres/DTO/create-genres.dto';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly movieService: MovieService,
        private readonly seriesService: SeriesService,
        private readonly directorsService: DirectorsService,
        private readonly episodesService: EpisodesService,
        private readonly genresService: GenresService,
        private readonly usersService: UsersService,
    ) {}
    @Get('users')
    getUsers() {
        return this.usersService.findAll()
    }

    @Post('movie')
    createMovie(@Body() createMoviesDto: CreateMoviesDto) {
        return this.movieService.create(createMoviesDto);
    }

    @Post('series')
    createSeries(@Body() createSeriesDto: CreateSeriesDto) {
        return this.seriesService.create(createSeriesDto);
    }

    @Post('episodes')
    createEpisodes(@Body() createEpisodesDto: CreateEpisodesDto) {
        return this.episodesService.create(createEpisodesDto);
    }

    @Post('directors')
    createDirectors(@Body() createDirectorsDto: CreateDirectorsDto) {
        return this.directorsService.create(createDirectorsDto);
    }

    @Post('genres')
    createGenres(@Body() createGenresDto: CreateGenresDto) {
        return this.genresService.create(createGenresDto);
    }
}
