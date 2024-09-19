import { Controller, Get, Param, Post, Body, Delete, Res } from '@nestjs/common';
import { AdminService } from './admins.service';
import { Admin } from './admins.entity';
import { CreateAdminDto } from './DTO/create-admin.dto';

@Controller('admins')
export class AdminController {
  constructor(private   adminService: AdminService) {}

  @Get()
  async findAll() {
    return this.adminService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Admin> {
    return this.adminService.findOne(id);
  }
  @Post()
  create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.adminService.remove(id);
  }
}