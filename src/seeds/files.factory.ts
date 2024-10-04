import { DataSource } from 'typeorm';
import { File } from '../files/files.entity';
import { faker } from '@faker-js/faker';

export const fileFactory = async (dataSource: DataSource) => {
  const fileRepository = dataSource.getRepository(File);

  const files = Array.from({ length: 10 }).map(() => {
    return fileRepository.create({
    bucket: faker.number.int({ min: 1000, max: 100000 }),
    fileSize: faker.number.int({ min: 1000, max: 100000 }),
    fileName: faker.system.fileName(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    deletedAt: null,})
  });

  await fileRepository.save(files);
  console.log('Files seeded!');
};
