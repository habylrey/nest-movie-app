import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episodes } from './episodes.entity';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { SeriesModule } from '../series/series.module';
import { AdminModule } from '../admins/admins.module';
import { AuthGuard } from '../auth/auth.helper';
import { UsersModule } from '../users/users.module';
import { WebsocketModule } from '../websocket/editing.module';
@Module( {
    imports: [TypeOrmModule.forFeature([Episodes]), SeriesModule, AdminModule, UsersModule, WebsocketModule],
    controllers: [EpisodesController],
    providers: [EpisodesService, AuthGuard]
} )
export class EpisodesModule {}