import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AdminModule } from '../admins/admins.module';
import { AuthGuard } from '../auth/auth.helper';
@Module({
    imports:[TypeOrmModule.forFeature([User]), AdminModule],
    controllers: [UsersController],
    providers: [UsersService, AuthGuard],
    exports: [UsersService]
  })
  export class UsersModule {}