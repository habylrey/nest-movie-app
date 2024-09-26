import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './favorites.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AdminModule } from '../admins/admins.module';
import { AuthHelper } from '../auth/auth.helper';
@Module( {
    imports: [TypeOrmModule.forFeature([Favorites]), AdminModule],
    controllers: [FavoritesController],
    providers: [FavoritesService, AuthHelper]
} )
export class FavoritesModule {}