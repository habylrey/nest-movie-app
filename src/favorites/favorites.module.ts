import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './favorites.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AdminModule } from '../admins/admins.module';
import { AuthGuard } from '../auth/auth.helper';
import { UsersModule } from '../users/users.module';
@Module( {
    imports: [TypeOrmModule.forFeature([Favorites]), AdminModule, UsersModule],
    controllers: [FavoritesController],
    providers: [FavoritesService, AuthGuard]
} )
export class FavoritesModule {}