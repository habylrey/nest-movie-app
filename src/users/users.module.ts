import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AdminModule } from '../admins/admins.module';
import { AuthHelper } from '../auth/auth.helper';
@Module({
    imports:[TypeOrmModule.forFeature([User]), AdminModule],
    controllers: [UsersController],
    providers: [UsersService, AuthHelper],
    exports: [UsersService]
  })
  export class UsersModule {}