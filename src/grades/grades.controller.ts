import { GradesService } from './grades.service';
import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { CreateGradeDto } from './DTO/create-grades.dto';
import { Grades } from './grades.entity';
import { IdDto } from '../common/DTO/id.dto'; 

@Controller('grade')
export class GradesController {
  constructor(private gradesService: GradesService) {}
  @Get()
  getAverageGrades() {
    return this.gradesService.getAverageGrades();
  }
  @Get('find')
  findGrades(@Query('id') id: number, @Query('type') type: 'movie' | 'series'): Promise<Grades[]> {
    return this.gradesService.findByMovieOrSeries(new IdDto(id), type);
  }
  @Post()
  createGrade(@Body() createGradeDto: CreateGradeDto): Promise<Grades> {
    return this.gradesService.createGrade(createGradeDto);
  }
}