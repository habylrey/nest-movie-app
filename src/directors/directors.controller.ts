import { Controller, Get, Req, Post, Body, Query, UseGuards } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { Directors } from './directors.entity';
import { CreateDirectorsDto } from './DTO/create-directors.dto';
import { IdDto } from '../common/DTO/id.dto';
import { AuthRequest } from '../common/interfaces/request.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminService } from '../admins/admins.service';
import { AuthGuard } from '../auth/auth.helper';
@Controller('directors')
export class DirectorsController {
  constructor(
    private readonly directorsService: DirectorsService,
    private readonly adminsService: AdminService
  ) {}

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
  @UseGuards(AuthGuard)
  async createDirectors(
    @Body() createDirectorsDto: CreateDirectorsDto,
  ): Promise<Directors> {
    return this.directorsService.create(createDirectorsDto);
  }
}