import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grades } from './grades.entity';
import { GradesController } from './grades.controller';
import { GradesService } from './grades.service';
import { GradesRepository } from './grades.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Grades])],
    controllers: [GradesController],
    providers: [GradesService, GradesRepository]
})
export class GradesModule {}