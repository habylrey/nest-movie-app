
import { Admin } from '../admins/admins.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export const adminFactory = async (dataSource: DataSource) => {
  const adminRepository = dataSource.getRepository(Admin);

  const Admins = Array.from({ length: 10 }).map(() => {
    return adminRepository.create({
    name: faker.internet.userName(),
    role: faker.helpers.arrayElement(['user', 'admin', 'superadmin']),
    email: faker.internet.email(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    deletedAt: null,})
  });

  await adminRepository.save(Admins);
  console.log('Admins seeded!');
};
