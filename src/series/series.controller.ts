import { Controller, Get, Param, Post, Body, Delete, Res } from '@nestjs/common';
import { SeriesService } from './series.service';
import { Series } from './series.entity';
import { CreateSeriesDto } from './DTO/create-series.dto';
import { IdDto } from '../common/DTO/id.dto'; 

@Controller('series')
export class SeriesController {
    constructor(private   seriesService: SeriesService) {}
    @Get()
    findAll() {
        return this.seriesService.findAll()
    }
    @Get(':id')
    findOne(@Param() params: IdDto): Promise<Series> {
      return this.seriesService.findOne(params.id);
    }
    @Post('admin')
    createSeries(@Body() createSeriesDto: CreateSeriesDto) {
        return this.seriesService.create(createSeriesDto);
    }

}