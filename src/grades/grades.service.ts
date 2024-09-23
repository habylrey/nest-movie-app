import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grades } from './grades.entity';
import { CreateGradeDto } from './DTO/create-grades.dto';
import { GradesRepository } from './grades.repository';
import { IdDto } from '../common/DTO/id.dto'; 

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grades)
    private gradesRepository: Repository<Grades>,
    private averageGradeRepository: GradesRepository,
  ) {}

  async createGrade(createGradeDto: CreateGradeDto): Promise<Grades> {
    const grade = this.gradesRepository.create(createGradeDto);
    return this.gradesRepository.save(grade);
  }

  async getAverageGrades(): Promise<any[]> {
    return this.averageGradeRepository.getAverageGrades();
  }

  async findByMovieOrSeries(idDto: IdDto, type: 'movie' | 'series'): Promise<Grades[]> {
    let grades: Grades[] = [];

    if (type === 'movie') {
      grades = await this.gradesRepository.find({ where: { movieId: idDto.id } });
    } else if (type === 'series') {
      grades = await this.gradesRepository.find({ where: { seriesId: idDto.id } });
    } 

    if (!grades.length) {
      throw new NotFoundException(`${type === 'movie' ? 'Movie' : 'Series'} with id ${idDto.id} not found or has no grades.`);
    }

    return grades;
  }
}