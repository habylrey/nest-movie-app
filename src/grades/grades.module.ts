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
@Module({
  imports: [TypeOrmModule.forFeature([Grades]), MoviesModule, SeriesModule, AdminModule, UsersModule], 
  controllers: [GradesController],
  providers: [GradesService, GradesRepository, AuthGuard],
  exports: [GradesService, GradesRepository]
})
export class GradesModule {}