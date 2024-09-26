import { Controller, Get, Req, Post, Body, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { Directors } from './directors.entity';
import { CreateDirectorsDto } from './DTO/create-directors.dto';
import { IdDto } from '../common/DTO/id.dto';
import { Request } from 'express';
import { AuthHelper } from '../auth/auth.helper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminService } from '../admins/admins.service';
@Controller('directors')
export class DirectorsController {
  constructor(private authHelper: AuthHelper, private directorsService: DirectorsService, private adminsService: AdminService) {}

  @Get()
  findAll(): Promise<Directors[]> {
    return this.directorsService.findAll();
  }

  @Get('find')
  findOne(@Query() query: IdDto): Promise<Directors> {
    return this.directorsService.findOne(query);
  }

  @Post('admin')
  @UseGuards(JwtAuthGuard)
  async createDirectors(@Req() req: Request, @Body() createDirectorsDto: CreateDirectorsDto): Promise<Directors> {
    await this.authHelper.validateUser(req, this.adminsService)
    return this.directorsService.create(createDirectorsDto);
  }
}