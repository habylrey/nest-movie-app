import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grades } from './grades.entity';
import { GradesController } from './grades.controller';
import { GradesService } from './grades.service';
import { GradesRepository } from './grades.repository';
import { MoviesModule } from '../movies/movies.module';
import { SeriesModule } from '../series/series.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([Grades]), MoviesModule, SeriesModule], 
  controllers: [GradesController],
  providers: [GradesService, GradesRepository],
  exports: [GradesService, GradesRepository]
})
export class GradesModule {}