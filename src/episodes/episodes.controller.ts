import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episodes } from './episodes.entity';
import { CreateEpisodesDto } from './DTO/create-episodes.dto';
import { IdDto } from '../common/DTO/id.dto';
import { EpisodeQueryDto } from '../common/DTO/query.dto';
@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  findAll(): Promise<Episodes[]> {
    return this.episodesService.findAll();
  }

  @Get(':seriesId')
  findEpisodes(
    @Param() params: IdDto,
    @Query() query: EpisodeQueryDto
  ): Promise<Episodes[]> {
    return this.episodesService.findEpisodes(params.id, query.season, query.episode);
  }

  @Post('admin')
  createEpisodes(@Body() createEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
    return this.episodesService.create(createEpisodesDto);
  }
}