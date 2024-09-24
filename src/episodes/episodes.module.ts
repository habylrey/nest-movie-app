import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episodes } from './episodes.entity';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { SeriesModule } from '../series/series.module';

@Module( {
    imports: [TypeOrmModule.forFeature([Episodes]), SeriesModule],
    controllers: [EpisodesController],
    providers: [EpisodesService]
} )
export class EpisodesModule {}