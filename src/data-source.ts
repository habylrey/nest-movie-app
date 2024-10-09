import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: 'postgres',
  password: 'Habbler2004',
  database: 'movie-app',
  synchronize: true,
  logging: false,
  entities: ["src/*/**/*.entity.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

export default AppDataSource; 