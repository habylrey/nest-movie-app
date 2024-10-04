
import { Series } from '../series/series.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export const seriesFactory = async (dataSource: DataSource) => {
  const seriesRepository = dataSource.getRepository(Series);

  const series =  Array.from({ length: 10 }).map(() => {
    return seriesRepository.create({
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    posterFileId: faker.number.int({ min: 1, max: 10 }),
    startYear: faker.date.past().getFullYear(),
    gradYear: faker.date.future().getFullYear(),
    genreId: faker.number.int({ min: 1, max: 10 }),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    deletedAt: null})
  });

  await seriesRepository.save(series);
  console.log('Series seeded!');
};
