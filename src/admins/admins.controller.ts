import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
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
  findOne(@Param() params: IdDto): Promise<Admin> {
    return this.adminService.findOne(params.id);
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Delete(':id')
  remove(@Param() params: IdDto): Promise<void> {
    return this.adminService.remove(params.id);
  }
}