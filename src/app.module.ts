import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { SeriesModule } from './series/series.module';
import { GradesModule } from './grades/grades.module';
import { GenresModule } from './genres/genres.module';
import { FavoritesModule } from './favorites/favorites.module';
import { EpisodesModule } from './episodes/episodes.module';
import { DirectorsModule } from './directors/directors.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admins/admins.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(
      {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      logging: true,
      synchronize: false, 
      autoLoadEntities: true
    }
    ),UsersModule, MoviesModule, SeriesModule, GradesModule, 
    GenresModule, FavoritesModule, EpisodesModule, DirectorsModule, AdminModule
  ]
})
export class AppModule {}
