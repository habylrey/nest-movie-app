import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grades } from './grades.entity';
import { CreateGradeDto } from './DTO/create-grades.dto';
import { GradesRepository } from './grades.repository';


//TODO add JS Doc here
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
  async findByMovieOrSeries(id: number, type: 'movie' | 'series'): Promise<Grades[]> {
    let grades: Grades[] = [];

    if (type === 'movie') {
      grades = await this.gradesRepository.find({ where: { movieId: id } });
    } else if (type === 'series') {
      grades = await this.gradesRepository.find({ where: { seriesId: id } });
    } else {
      throw new NotFoundException(`Invalid type: ${type}. Must be 'movie' or 'series'.`);
    }

    if (!grades.length) {
      throw new NotFoundException(`${type === 'movie' ? 'Movie' : 'Series'} with id ${id} not found or has no grades.`);
    }

    return grades;
  }
}
//TODO add JS Doc here