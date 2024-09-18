import { GradesService } from './grades.service';
import { Controller, Get, Param, Post, Body, Delete, Res, Query } from '@nestjs/common';
import { CreateGradeDto } from './DTO/create-grades.dto';
import { Grades } from './DTO/grades.entity';

@Controller('grade')
export class GradesController {
    constructor(private readonly gradesService: GradesService) {}

    @Get()
    getAverageGrades(
    ) {
        return this.gradesService.getAverageGrades();
    }
    @Get(':movie')
    findOne(@Param('movie') movie_id: number,
    ): Promise<Grades> {
    return this.gradesService.findOne(movie_id);
    //TODO 
  }
    @Post()
    crateGrade(@Body() createGradeDto: CreateGradeDto): Promise<Grades> {
        return this.gradesService.createGrade(createGradeDto)
    }
}