import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grades } from './grades.entity';
import { GradesController } from './grades.controller';
import { GradesService } from './grades.service';
import { GradesRepository } from './grades.repository';
import { MoviesModule } from '../movies/movies.module';
import { SeriesModule } from '../series/series.module'; 
import { AdminModule } from '../admins/admins.module';
import { AuthHelper } from '../auth/auth.helper';
@Module({
  imports: [TypeOrmModule.forFeature([Grades]), MoviesModule, SeriesModule, AdminModule], 
  controllers: [GradesController],
  providers: [GradesService, GradesRepository, AuthHelper],
  exports: [GradesService, GradesRepository]
})
export class GradesModule {}