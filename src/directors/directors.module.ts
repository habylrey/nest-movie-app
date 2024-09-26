import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directors } from './directors.entity';
import { DirectorsController } from './directors.controller';
import { DirectorsService } from './directors.service';
import { AdminModule } from '../admins/admins.module';
import { AuthHelper } from '../auth/auth.helper';

@Module( {
    imports: [TypeOrmModule.forFeature([Directors]), AdminModule],
    controllers: [DirectorsController],
    providers: [DirectorsService, AuthHelper],
    exports: [DirectorsService]
} )
export class DirectorsModule {}