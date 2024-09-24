import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MoviesController } from './movies.controller';
import { MovieService } from './movies.service';
import { GenresModule } from '../genres/genres.module';
import { DirectorsModule } from '../directors/directors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), GenresModule, DirectorsModule],
  controllers: [MoviesController],
  providers: [MovieService],
  exports: [MovieService], 
})
export class MoviesModule {}