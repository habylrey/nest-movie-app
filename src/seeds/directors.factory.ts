import { Directors } from '../directors/directors.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export const directorFactory = async (dataSource: DataSource) => {
  const directorRepository = dataSource.getRepository(Directors);

  const directors = Array.from({ length: 10 }).map(() => {
    return directorRepository.create({
      name: faker.internet.userName(),
      description: faker.lorem.sentence(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      deletedAt: null,
      directorPhotoId: faker.number.int(1),
    })
  });

  await directorRepository.save(directors);
  console.log('Directors seeded!');
};
