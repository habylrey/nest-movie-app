import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episodes } from './DTO/episodes.entity';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

@Module( {
    imports: [TypeOrmModule.forFeature([Episodes])],
    controllers: [EpisodesController],
    providers: [EpisodesService]
} )
export class EpisodesModule {}