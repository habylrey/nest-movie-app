import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directors } from './directors.entity';
import { DirectorsController } from './directors.controller';
import { DirectorsService } from './directors.service';
import { AdminModule } from '../admins/admins.module';
import { AuthGuard } from '../auth/auth.helper';
import { UsersModule } from '../users/users.module';
import { WebsocketModule } from '../websocket/editing.module';
import { RedisService } from '../redis/redis.service';

@Module( {
    imports: [TypeOrmModule.forFeature([Directors]), AdminModule, UsersModule, WebsocketModule],
    controllers: [DirectorsController],
    providers: [DirectorsService, AuthGuard, RedisService],
    exports: [DirectorsService]
} )
export class DirectorsModule {}