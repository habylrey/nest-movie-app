import { GradesService } from './grades.service';
import { Controller, Get, Req, Post, Body, Query } from '@nestjs/common';
import { CreateGradeDto } from './DTO/create-grades.dto';
import { Grades } from './grades.entity';
import { IdDto } from '../common/DTO/id.dto'; 
import { AdminService } from '../admins/admins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '../auth/auth.helper';
import { Request } from 'express';
@Controller('grade')
export class GradesController {
  constructor(private gradesService: GradesService) {}
  @Get()
  getAverageGrades() {
    return this.gradesService.getAverageGrades();
  }
  @Get('find')
  findGrades(@Req() req: Request, @Query('type') type: 'movie' | 'series'): Promise<Grades[]> {
    const user = req['user']; 
    return this.gradesService.findByMovieOrSeries(user.sub, type);
  }
  @Post()
  createGrade(@Body() createGradeDto: CreateGradeDto): Promise<Grades> {
    return this.gradesService.createGrade(createGradeDto);
  }
}