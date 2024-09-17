import { GradesService } from './grades.service';
import { Controller, Get, Param, Post, Body, Delete, Res } from '@nestjs/common';
import { CreateGradeDto } from './DTO/grade-create.dto';
import { Grades } from './DTO/grades.entity';

@Controller('grade')
export class GradesController {
    constructor(private readonly gradesService: GradesService) {}

    @Get()
    getAverageGrades() {
        return this.gradesService.getAverageGrades();
    }
    @Get('movies')
    getAverageMoviesGrade(){
        return this.gradesService.getAverageMoviesGrades()
    }
    @Get('series')
    getAverageSeriesGrade(){
        return this.gradesService.getAverageSeriesGrades()
    }
    @Post()
    crateGrade(@Body() createGradeDto: CreateGradeDto): Promise<Grades> {
        return this.gradesService.createGrade(createGradeDto)
    }
}