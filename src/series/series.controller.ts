import { Controller, Get, Param, Post, Body, Delete, Res } from '@nestjs/common';
import { SeriesService } from './series.service';
import { Series } from './DTO/series.entity';

@Controller('series')
export class SeriesController {
    constructor(private readonly seriesService: SeriesService) {}
    @Get()
    findAll() {
        return this.seriesService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Series> {
      return this.seriesService.findOne(id);
    }

}