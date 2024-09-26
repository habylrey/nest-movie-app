import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episodes } from './episodes.entity';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { SeriesModule } from '../series/series.module';
import { AdminModule } from '../admins/admins.module';
import { AuthHelper } from '../auth/auth.helper';
@Module( {
    imports: [TypeOrmModule.forFeature([Episodes]), SeriesModule, AdminModule],
    controllers: [EpisodesController],
    providers: [EpisodesService, AuthHelper]
} )
export class EpisodesModule {}