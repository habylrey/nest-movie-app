
import { Genres } from '../genres/genres.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export const genreFactory = async (dataSource: DataSource) => {
  const genreRepository = dataSource.getRepository(Genres);

  const genres = Array.from({ length: 10 }).map(() => {
    return genreRepository.create({name: faker.lorem.word(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    deletedAt: null})
  });

  await genreRepository.save(genres);
  console.log('Genres seeded!');
};
