import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AdminModule } from '../admins/admins.module';
import { AuthGuard } from '../auth/auth.helper';
import { EmailModule } from '../nodemailer/email.module';
@Module({
    imports:[TypeOrmModule.forFeature([User]), AdminModule, EmailModule],
    controllers: [UsersController],
    providers: [UsersService, AuthGuard],
    exports: [UsersService]
  })
  export class UsersModule {}