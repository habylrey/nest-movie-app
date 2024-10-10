import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './favorites.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AdminModule } from '../admins/admins.module';
import { AuthGuard } from '../auth/auth.helper';
import { UsersModule } from '../users/users.module';
import { WebsocketModule } from '../websocket/editing.module';
import { RedisService } from '../redis/redis.service';
@Module( {
    imports: [TypeOrmModule.forFeature([Favorites]), AdminModule, UsersModule, WebsocketModule],
    controllers: [FavoritesController],
    providers: [FavoritesService, AuthGuard, RedisService]
} )
export class FavoritesModule {}