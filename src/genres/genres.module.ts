import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genres } from './genres.entity';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { AdminModule } from '../admins/admins.module';
import { AuthHelper } from '../auth/auth.helper';

@Module( {
    imports: [TypeOrmModule.forFeature([Genres]), AdminModule],
    controllers: [GenresController],
    providers: [GenresService, AuthHelper],
    exports: [GenresService]
} )
export class GenresModule {}