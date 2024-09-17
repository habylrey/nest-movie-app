import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genres } from './DTO/genres.entity';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';

@Module( {
    imports: [TypeOrmModule.forFeature([Genres])],
    controllers: [GenresController],
    providers: [GenresService]
} )
export class GenresModule {}