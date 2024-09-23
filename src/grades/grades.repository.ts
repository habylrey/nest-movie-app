import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Grades } from './grades.entity';

@Injectable()
export class GradesRepository extends Repository<Grades> {
  constructor(private dataSource: DataSource) {
    super(Grades, dataSource.createEntityManager());
  }

  async getAverageGrades(): Promise<any[]> {
    const movieGradesQuery = `
      SELECT
        grades.movie_id AS id,
        movies.name,
        AVG(grades.grade) AS averageGrade
      FROM grades
      INNER JOIN movies ON movies.id = grades.movie_id
      WHERE grades.movie_id IS NOT NULL
      GROUP BY grades.movie_id, movies.name
    `;

    const seriesGradesQuery = `
      SELECT
        grades.series_id AS id,
        series.name,
        AVG(grades.grade) AS averageGrade
      FROM grades
      INNER JOIN series ON series.id = grades.series_id
      WHERE grades.series_id IS NOT NULL
      GROUP BY grades.series_id, series.name
    `;

    const movieGrades = await this.query(movieGradesQuery);
    const seriesGrades = await this.query(seriesGradesQuery);

    const combinedGrades = [...movieGrades, ...seriesGrades]
      .map(item => ({
        ...item,
        averageGrade: parseFloat(item.averageGrade),
        type: item.id ? (item.movie_id ? 'movie' : 'series') : null
      }))
      .sort((a, b) => b.averageGrade - a.averageGrade);

    return combinedGrades;
  }
}