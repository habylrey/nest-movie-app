import { Module } from '@nestjs/common';
import { AdminController } from './admins.controller';
import { AdminService } from './admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admins.entity';
import { WebsocketModule } from '../websocket/editing.module';
import { RedisService } from '../redis/redis.service';
@Module({
    imports:[TypeOrmModule.forFeature([Admin]), WebsocketModule],
    controllers: [AdminController],
    providers: [AdminService, RedisService],
    exports: [AdminService]
  })
  export class AdminModule {}