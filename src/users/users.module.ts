import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AdminModule } from '../admins/admins.module';
import { AuthGuard } from '../auth/auth.helper';
import { EmailModule } from '../nodemailer/email.module';
import { WebsocketModule } from '../websocket/editing.module';
import { EditingService } from '../websocket/editing.service';
import { EditingGateway } from '../websocket/editing.gateway';
import { EditingCheckMiddleware } from '../websocket/state.middleware';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AdminModule,
    EmailModule,
    WebsocketModule
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, EditingService, EditingGateway, RedisService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EditingCheckMiddleware)
      .forRoutes(
        { path: 'user/done', method: RequestMethod.GET }
      );
  }
}