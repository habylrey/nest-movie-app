import { Episodes } from '../episodes/episodes.entity';
import { Series } from '../series/series.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export const episodeFactory = async (dataSource: DataSource) => {
  const episodeRepository = dataSource.getRepository(Episodes);
  const seriesRepository = dataSource.getRepository(Series);

  const allSeries = await seriesRepository.find();

  if (allSeries.length === 0) {
    console.log('No series found. Please seed series first.');
    return;
  }

  const episodes = await Promise.all(Array.from({ length: 10 }).map(async () => {
    const randomSeries = faker.helpers.arrayElement(allSeries);

    return episodeRepository.create({
      episodeLink: faker.internet.url(),
      description: faker.lorem.sentence(),
      name: faker.lorem.words(2),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      deletedAt: null,
      previewFileId: faker.number.int({ min: 1, max: 100 }),
      seriesId: randomSeries.id,
      season: faker.number.int({ min: 1, max: 10 }),
      episode: faker.number.int({ min: 1, max: 20 }),
    });
  }));

  await episodeRepository.save(episodes);
  console.log('Episodes seeded!');
};