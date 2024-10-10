import { Module } from '@nestjs/common';
import { EditingService } from './editing.service';
import { EditingGateway } from './editing.gateway';
import { RedisService } from '../redis/redis.service';

@Module({
  providers: [EditingService, EditingGateway, RedisService],
  exports: [EditingService],
})
export class WebsocketModule {}