import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grades } from './grades.entity';
import { GradesController } from './grades.controller';
import { GradesService } from './grades.service';
import { GradesRepository } from './grades.repository';
import { MoviesModule } from '../movies/movies.module';
import { SeriesModule } from '../series/series.module'; 
import { AdminModule } from '../admins/admins.module';
import { AuthGuard } from '../auth/auth.helper';
import { UsersModule } from '../users/users.module';
import { WebsocketModule } from '../websocket/editing.module';
import { RedisService } from '../redis/redis.service';
@Module({
  imports: [TypeOrmModule.forFeature([Grades]), MoviesModule, SeriesModule, AdminModule, UsersModule, WebsocketModule], 
  controllers: [GradesController],
  providers: [GradesService, GradesRepository, AuthGuard, RedisService],
  exports: [GradesService, GradesRepository]
})
export class GradesModule {}