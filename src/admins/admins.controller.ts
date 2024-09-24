import { Controller, Get, Query, Post, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admins.service';
import { Admin } from './admins.entity';
import { CreateAdminDto } from './DTO/create-admin.dto';
import { IdDto } from '../common/DTO/id.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';


@ApiTags('admins')
@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Successful retrieval of all admins.' })
  async findAll() {
    return this.adminService.findAll();
  }

  @Get('find')
  findOne(@Query('id', ParseIntPipe) id: number): Promise<Admin> {
    return this.adminService.findOne(new IdDto(id));
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Delete('remove')
  remove(@Query('id', ParseIntPipe) id: number): Promise<void> {
    return this.adminService.remove(new IdDto(id));
  }
}