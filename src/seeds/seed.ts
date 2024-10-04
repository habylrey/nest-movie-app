import { DataSource } from 'typeorm';
import { favoriteFactory } from './favorites.factory';
import { movieFactory } from './movies.factory';
import { seriesFactory } from './series.factory';
import { userFactory } from './users.factory';
import { gradeFactory } from './grades.factory';
import { genreFactory } from './genres.factory';
import { fileFactory } from './files.factory';
import { episodeFactory } from './episodes.factory';
import { directorFactory } from './directors.factory';
import { adminFactory } from './admins.factory';
import { ConfigModule } from '@nestjs/config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ["src/*/**/*.entity.ts"],
  synchronize: false,
  logging: true,
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

const runSeeds = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established.');
    await directorFactory(AppDataSource);
    await genreFactory(AppDataSource);
    await userFactory(AppDataSource);
    await movieFactory(AppDataSource);
    await seriesFactory(AppDataSource);
    await gradeFactory(AppDataSource);
    await favoriteFactory(AppDataSource);
    await episodeFactory(AppDataSource);
    await adminFactory(AppDataSource);
    await fileFactory(AppDataSource);
    console.log('All seeds executed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
    console.log('Database connection closed.');
  }
};

runSeeds();
