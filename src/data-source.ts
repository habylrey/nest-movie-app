import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.USER, 
  password: process.env.PASSWORD, 
  database: process.env.DATABASE, 
  synchronize: true,
  logging: false,
  entities: ["src/*/**/*.entity.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

export default AppDataSource;
