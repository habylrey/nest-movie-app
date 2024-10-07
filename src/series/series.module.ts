import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from './series.entity';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { WebsocketModule } from '../websocket/editing.module';


@Module( {
    imports: [TypeOrmModule.forFeature([Series]), WebsocketModule],
    controllers: [SeriesController],
    providers: [SeriesService],
    exports: [SeriesService],
} )
export class SeriesModule {}