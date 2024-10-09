import { ConfigModule } from '@nestjs/config';
import { DataSource } from "typeorm"


ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: ['.env'],
  })

export const AppDataSource = new DataSource({
    type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      logging: true,
      synchronize: false, 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsTableName: "migration_table",
      
})