import { GradesService } from './grades.service';
import { Controller, Get, Req, Post, Body, Query } from '@nestjs/common';
import { CreateGradeDto } from './DTO/create-grades.dto';
import { Grades } from './grades.entity';
import { Person } from '../common/interfaces/request.interface';
import { AuthUser } from '../auth/auth.user';
@Controller('grade')
export class GradesController {
  constructor(private gradesService: GradesService) {}
  @Get()
  getAverageGrades() {
    return this.gradesService.getAverageGrades();
  }
  @Get('find')
  findGrades(@AuthUser() person: Person, @Query('type') type: 'movie' | 'series'): Promise<Grades[]> {
    return this.gradesService.findByMovieOrSeries(person, type);
  }
  @Post()
  createGrade(@Body() createGradeDto: CreateGradeDto): Promise<Grades> {
    return this.gradesService.createGrade(createGradeDto);
  }
}