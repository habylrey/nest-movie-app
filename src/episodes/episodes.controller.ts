import { Controller, Get, Param, Query, Post, Body, ParseIntPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episodes } from './episodes.entity';
import { CreateEpisodesDto } from './DTO/create-episodes.dto';
import { EpisodeQueryDto } from '../common/DTO/query.dto';
import { IdDto } from '../common/DTO/id.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  findAll(): Promise<Episodes[]> {
    return this.episodesService.findAll();
  }

  @Get('series')
  findEpisodes(
    @Query('id', ParseIntPipe) id: number,
    @Query() query: EpisodeQueryDto
  ): Promise<Episodes[]> {
    return this.episodesService.findEpisodes(id, query.season, query.episode);
  }

  @Post('admin')
  createEpisodes(@Body() createEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
    return this.episodesService.create(createEpisodesDto);
  }
}