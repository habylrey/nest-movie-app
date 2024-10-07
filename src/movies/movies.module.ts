import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MoviesController } from './movies.controller';
import { MovieService } from './movies.service';
import { GenresModule } from '../genres/genres.module';
import { DirectorsModule } from '../directors/directors.module';
import { AdminModule } from '../admins/admins.module';
import { AuthGuard } from '../auth/auth.helper';
import { UsersModule } from '../users/users.module';
import { WebsocketModule } from '../websocket/editing.module';
@Module({
  imports: [TypeOrmModule.forFeature([Movie]),AdminModule, GenresModule, DirectorsModule, UsersModule, WebsocketModule],
  controllers: [MoviesController],
  providers: [MovieService, AuthGuard],
  exports: [MovieService], 
})
export class MoviesModule {}