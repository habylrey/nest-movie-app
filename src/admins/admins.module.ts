import { Module } from '@nestjs/common';
import { AdminController } from './admins.controller';
import { AdminService } from './admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admins.entity';
@Module({
    imports:[TypeOrmModule.forFeature([Admin])],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService]
  })
  export class AdminModule {}