import { Movie } from '../movies/movies.entity';
import { Directors } from '../directors/directors.entity'; 
import { Genres } from '../genres/genres.entity'; 
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export const movieFactory = async (dataSource: DataSource) => {
  const movieRepository = dataSource.getRepository(Movie);
  const directorRepository = dataSource.getRepository(Directors);
  const genreRepository = dataSource.getRepository(Genres);

  const directors = await directorRepository.find();
  const genres = await genreRepository.find();

  if (directors.length === 0 || genres.length === 0) {
    console.log('No directors or genres found. Please seed directors and genres first.');
    return;
  }

  const movies = await Promise.all(Array.from({ length: 10 }).map(async () => {
    const randomDirector = faker.helpers.arrayElement(directors);
    const randomGenre = faker.helpers.arrayElement(genres);

    return movieRepository.create({
      name: faker.lorem.sentence(),
      directorId: randomDirector.id,
      description: faker.lorem.paragraph(),
      link: faker.internet.url(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      posterFileId: faker.number.int({min: 1, max: 10}), 
      genreId: randomGenre.id,
    });
  }));

  await movieRepository.save(movies);
  console.log('Movies seeded!');
};