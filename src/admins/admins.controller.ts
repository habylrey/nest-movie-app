import { Controller, Get, Param, Post, Body, Delete,ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admins.service';
import { Admin } from './admins.entity';
import { CreateAdminDto } from './DTO/create-admin.dto';
import { IdDto } from '../common/DTO/id.dto'; 

@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Admin> {
    const idDto = new IdDto();
    idDto.id = id;
    return this.adminService.findOne(idDto);
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const idDto = new IdDto();
    idDto.id = id;
    return this.adminService.remove(idDto);
  }
} 