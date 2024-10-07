import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AdminModule } from '../admins/admins.module';
import { AuthGuard } from '../auth/auth.helper';
import { EmailModule } from '../nodemailer/email.module';
import { WebsocketModule } from '../websocket/editing.module';
import { EditingService } from '../websocket/editing.service';
import { EditingGateway } from '../websocket/editing.gateway';
@Module({
    imports:[TypeOrmModule.forFeature([User]), AdminModule, EmailModule, WebsocketModule],
    controllers: [UsersController],
    providers: [UsersService, AuthGuard, EditingService, EditingGateway],
    exports: [UsersService]
  })
  export class UsersModule {}