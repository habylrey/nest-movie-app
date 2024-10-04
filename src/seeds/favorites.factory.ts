import { Favorites } from '../favorites/favorites.entity';
import { Movie } from '../movies/movies.entity';
import { User } from '../users/users.entity';
import { Series } from '../series/series.entity';
import { Grades } from '../grades/grades.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export const favoriteFactory = async (dataSource: DataSource) => {
  const favoriteRepository = dataSource.getRepository(Favorites);
  const movieRepository = dataSource.getRepository(Movie);
  const userRepository = dataSource.getRepository(User);
  const seriesRepository = dataSource.getRepository(Series);
  const gradeRepository = dataSource.getRepository(Grades);

  const movies = await movieRepository.find();
  const users = await userRepository.find();
  const allSeries = await seriesRepository.find();
  const grades = await gradeRepository.find();

  if (movies.length === 0 || users.length === 0 || grades.length === 0) {
    console.log('No movies, users or grades found. Please seed movies, users and grades first.');
    return;
  }

  const favorites = await Promise.all(Array.from({ length: 10 }).map(async () => {
    const randomMovie = faker.helpers.arrayElement(movies);
    const randomUser = faker.helpers.arrayElement(users);
    const randomSeries = Math.random() > 0.5 ? faker.helpers.arrayElement(allSeries) : null;
    const randomGrade = faker.helpers.arrayElement(grades);

    return favoriteRepository.create({
      movie: randomMovie.id,
      user: randomUser.id,
      series: randomSeries ? randomSeries.id : null,
      grade: randomGrade.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }));

  await favoriteRepository.save(favorites);
  console.log('Favorites seeded!');
};