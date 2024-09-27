import { Controller, Get, Query, Post, Body, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdminService } from './admins.service';
import { Admin } from './admins.entity';
import { CreateAdminDto } from './DTO/create-admin.dto';
import { IdDto } from '../common/DTO/id.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Request, query } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('admins')
@UseGuards(JwtAuthGuard)
@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @Get('find')
  findOne(@Query() query: IdDto): Promise<Admin> {
    return this.adminService.findOne(query);
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Delete('remove')
  remove(@Query() query: IdDto): Promise<void> {
    return this.adminService.remove(query);
  }
}