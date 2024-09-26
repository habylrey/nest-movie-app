import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directors } from './directors.entity';
import { DirectorsController } from './directors.controller';
import { DirectorsService } from './directors.service';

@Module( {
    imports: [TypeOrmModule.forFeature([Directors])],
    controllers: [DirectorsController],
    providers: [DirectorsService],
    exports: [DirectorsService]
} )
export class DirectorsModule {}