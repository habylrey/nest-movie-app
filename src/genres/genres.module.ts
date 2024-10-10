import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genres } from './genres.entity';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { AdminModule } from '../admins/admins.module';
import { AuthGuard } from '../auth/auth.helper';
import { UsersModule } from '../users/users.module';
import { WebsocketModule } from '../websocket/editing.module';
import { RedisService } from '../redis/redis.service';

@Module( {
    imports: [TypeOrmModule.forFeature([Genres]), AdminModule, UsersModule, WebsocketModule],
    controllers: [GenresController],
    providers: [GenresService, AuthGuard, RedisService],
    exports: [GenresService]
} )
export class GenresModule {}