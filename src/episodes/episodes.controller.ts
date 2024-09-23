// episodes.controller.ts
import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episodes } from './episodes.entity';
import { CreateEpisodesDto } from './DTO/create-episodes.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  findAll(): Promise<Episodes[]> {
    return this.episodesService.findAll();
  }

  @Get(':seriesId')
  findEpisodes(
    @Param('seriesId') seriesId: number,
    @Query('season') season?: number,
    @Query('episode') episode?: number,
  ): Promise<Episodes[]> {
    return this.episodesService.findEpisodes(seriesId, season, episode);
  }

  @Post('admin')
  createEpisodes(@Body() createEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
    return this.episodesService.create(createEpisodesDto);
  }
}