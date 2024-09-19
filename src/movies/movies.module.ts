import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MoviesController } from './movies.controller';
import { MovieService } from './movies.service';


@Module( {
    imports: [TypeOrmModule.forFeature([Movie])],
    controllers: [MoviesController],
    providers: [MovieService]
} )
export class MoviesModule {}