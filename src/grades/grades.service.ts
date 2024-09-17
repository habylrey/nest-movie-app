import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grades } from './DTO/grades.entity';
import { CreateGradeDto } from './DTO/grade-create.dto';

@Injectable()
export class GradesService {
    constructor(
        @InjectRepository(Grades)
        private gradesRepository: Repository<Grades>
    ) {}
    async createGrade (createGradeDto: CreateGradeDto): Promise<Grades> {
        const grade = this.gradesRepository.create(createGradeDto)
        return this.gradesRepository.save(grade)
    }
    async getAverageGrades(): Promise<any[]> {
        const movieGrades = await this.gradesRepository
            .createQueryBuilder('grades')
            .select('grades.movie_id', 'id')
            .addSelect('movies.name', 'name')
            .addSelect('AVG(grades.grade)', 'averageGrade')
            .innerJoin('movies', 'movies', 'movies.id = grades.movie_id')
            .where('grades.movie_id IS NOT NULL')
            .groupBy('grades.movie_id')
            .addGroupBy('movies.name')
            .getRawMany();

        const seriesGrades = await this.gradesRepository
            .createQueryBuilder('grades')
            .select('grades.series_id', 'id')
            .addSelect('series.name', 'name')
            .addSelect('AVG(grades.grade)', 'averageGrade')
            .innerJoin('series', 'series', 'series.id = grades.series_id')
            .where('grades.series_id IS NOT NULL')
            .groupBy('grades.series_id')
            .addGroupBy('series.name')
            .getRawMany();

        const combinedGrades = [...movieGrades, ...seriesGrades]
            .map(item => ({
                ...item,
                averageGrade: parseFloat(item.averageGrade),
                type: item.movie_id ? 'movie' : 'series'
            }))
            .sort((a, b) => b.averageGrade - a.averageGrade);

        return combinedGrades;
    }
    async getAverageMoviesGrades(): Promise<any[]> {
        const movieGrades = await this.gradesRepository
            .createQueryBuilder('grades')
            .select('grades.movie_id', 'id')
            .addSelect('movies.name', 'name')
            .addSelect('AVG(grades.grade)', 'averageGrade')
            .innerJoin('movies', 'movies', 'movies.id = grades.movie_id')
            .where('grades.movie_id IS NOT NULL')
            .groupBy('grades.movie_id')
            .addGroupBy('movies.name')
            .getRawMany();

            return movieGrades.sort((a, b) => a - b)
    }
    async getAverageSeriesGrades(): Promise<any[]> {
            const seriesGrades = await this.gradesRepository
            .createQueryBuilder('grades')
            .select('grades.series_id', 'id')
            .addSelect('series.name', 'name')
            .addSelect('AVG(grades.grade)', 'averageGrade')
            .innerJoin('series', 'series', 'series.id = grades.series_id')
            .where('grades.series_id IS NOT NULL')
            .groupBy('grades.series_id')
            .addGroupBy('series.name')
            .getRawMany();

            return seriesGrades.sort((a, b) => a - b)
    }
}