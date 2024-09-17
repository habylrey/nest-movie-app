import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grades } from './DTO/grades.entity';
import { GradesController } from './grades.controller';
import { GradesService } from './grades.service';

@Module({
    imports: [TypeOrmModule.forFeature([Grades])],
    controllers: [GradesController],
    providers: [GradesService]
})
export class GradesModule {}