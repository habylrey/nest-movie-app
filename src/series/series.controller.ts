import { Controller, Get, Param, Post, Body, ParseIntPipe } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Series> {
    const idDto = new IdDto();
    idDto.id = id;
    return this.seriesService.findOne(idDto);
  }

  @Post('admin')
  createSeries(@Body() createSeriesDto: CreateSeriesDto) {
    return this.seriesService.create(createSeriesDto);
  }
}