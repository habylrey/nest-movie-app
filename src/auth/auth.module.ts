import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from '../nodemailer/email.module';
import { AdminModule } from '../admins/admins.module';
import { EditingService } from '../websocket/editing.service';
import { WebsocketModule } from '../websocket/editing.module';
import { EditingGateway } from '../websocket/editing.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET, 
      signOptions: { expiresIn: '1h' },
    }), EmailModule, AdminModule, WebsocketModule
  ],
  providers: [AuthService, JwtStrategy, EditingService, EditingGateway],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}