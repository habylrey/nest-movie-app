import { Grades } from '../grades/grades.entity';
import { Series } from '../series/series.entity'; 
import { Movie } from '../movies/movies.entity';
import { User } from '../users/users.entity'; 
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export const gradeFactory = async (dataSource: DataSource) => {
  const gradeRepository = dataSource.getRepository(Grades);
  const seriesRepository = dataSource.getRepository(Series);
  const movieRepository = dataSource.getRepository(Movie);
  const userRepository = dataSource.getRepository(User);

  const series = await seriesRepository.find();
  const movies = await movieRepository.find();
  const users = await userRepository.find();

  if (series.length === 0 || movies.length === 0 || users.length === 0) {
    console.log('No series, movies or users found. Please seed series, movies and users first.');
    return;
  }

  const grades = await Promise.all(Array.from({ length: 10 }).map(async () => {
    const randomSeries = faker.helpers.arrayElement(series);
    const randomMovie = faker.helpers.arrayElement(movies);
    const randomUser = faker.helpers.arrayElement(users);

    return gradeRepository.create({
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      deletedAt: null,
      grade: faker.number.int({ min: 1, max: 5 }),
      seriesId: randomSeries.id,
      movieId: randomMovie.id,
      userId: randomUser.id,
    });
  }));

  await gradeRepository.save(grades);
  console.log('Grades seeded!');
};