import { Controller, Get, Query, Post, Body, ParseIntPipe } from '@nestjs/common';
import { SeriesService } from './series.service';
import { Series } from './series.entity';
import { CreateSeriesDto } from './DTO/create-series.dto';
import { IdDto } from '../common/DTO/id.dto';

@Controller('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Get()
  findAll() {
    return this.seriesService.findAll();
  }

  @Get('find')
  findOne(@Query('id', ParseIntPipe) id: number): Promise<Series> {
    
    return this.seriesService.  findOne(new IdDto(id));
  }

  @Post('admin')
  createSeries(@Body() createSeriesDto: CreateSeriesDto) {
    return this.seriesService.create(createSeriesDto);
  }
}