
import { User } from '../users/users.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export const userFactory = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const users = Array.from({ length: 10 }).map(() => {
    return userRepository.create({
    name: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    userPicId: faker.number.int({ min: 1, max: 10 }),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    deletedAt: null,})
  });

  await userRepository.save(users);
  console.log('Users seeded!');
};
