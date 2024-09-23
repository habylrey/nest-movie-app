import { GradesService } from './grades.service';
import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { CreateGradeDto } from './DTO/create-grades.dto';
import { Grades } from './grades.entity';

@Controller('grade')
export class GradesController {
  constructor(private gradesService: GradesService) {}
  @Get()
  getAverageGrades() {
    return this.gradesService.getAverageGrades();
  }
  @Get(':id')
  findGrades(@Param('id') id: number, @Query('type') type: 'movie' | 'series'): Promise<Grades[]> {
    return this.gradesService.findByMovieOrSeries(id, type);
  }
  @Post()
  createGrade(@Body() createGradeDto: CreateGradeDto): Promise<Grades> {
    return this.gradesService.createGrade(createGradeDto);
  }
}