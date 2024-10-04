import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,
  entities: ["src/*/**/*.entity.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

export default AppDataSource; 