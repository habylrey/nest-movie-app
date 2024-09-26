import { Controller, Get, Param, Post, Body, ParseIntPipe, Query } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { Directors } from './directors.entity';
import { CreateDirectorsDto } from './DTO/create-directors.dto';
import { IdDto } from '../common/DTO/id.dto';

@Controller('directors')
export class DirectorsController {
  constructor(private directorsService: DirectorsService) {}

  @Get()
  findAll(): Promise<Directors[]> {
    return this.directorsService.findAll();
  }

  @Get('find')
  findOne(@Query('id', ParseIntPipe) id: number): Promise<Directors> {
    
    return this.directorsService.  findOne(new IdDto(id));
  }

  @Post('admin')
  createDirectors(@Body() createDirectorsDto: CreateDirectorsDto): Promise<Directors> {
    return this.directorsService.create(createDirectorsDto);
  }
}