import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admins.controller';
import { MovieService } from '../movies/movies.service';
import { SeriesService } from '../series/series.service';
import { DirectorsService } from '../directors/directors.service';
import { EpisodesService } from '../episodes/episodes.service';
import { GenresService } from '../genres/genres.service';
import { UsersService } from '../users/users.service';
import { Movie } from '../movies/DTO/movies.entity';
import { Series } from '../series/DTO/series.entity';
import { Directors } from '../directors/DTO/directors.entity';
import { Episodes } from '../episodes/DTO/episodes.entity';
import { Genres } from '../genres/DTO/genres.entity';
import { User } from '../users/DTO/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Series, Directors, Episodes, Genres, User]),
  ],
  controllers: [AdminController],
  providers: [
    MovieService,
    SeriesService,
    DirectorsService,
    EpisodesService,
    GenresService,
    UsersService,
  ],
})
export class AdminModule {}