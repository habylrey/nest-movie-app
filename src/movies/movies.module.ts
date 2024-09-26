import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MoviesController } from './movies.controller';
import { MovieService } from './movies.service';
import { GenresModule } from '../genres/genres.module';
import { DirectorsModule } from '../directors/directors.module';
import { AdminModule } from '../admins/admins.module';
import { AuthHelper } from '../auth/auth.helper';
@Module({
  imports: [TypeOrmModule.forFeature([Movie]),AdminModule, GenresModule, DirectorsModule],
  controllers: [MoviesController],
  providers: [MovieService, AuthHelper],
  exports: [MovieService], 
})
export class MoviesModule {}