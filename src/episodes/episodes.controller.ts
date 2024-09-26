import { Controller, Get, Req, Query, Post, Body, ParseIntPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episodes } from './episodes.entity';
import { CreateEpisodesDto } from './DTO/create-episodes.dto';
import { EpisodeQueryDto } from '../common/DTO/query.dto';
import { IdDto } from '../common/DTO/id.dto';
import { AdminService } from '../admins/admins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthHelper } from '../auth/auth.helper';
import { Request } from 'express';
@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private authHelper: AuthHelper,
    private adminsService: AdminService
    ) {}

  @Get()
  findAll(): Promise<Episodes[]> {
    return this.episodesService.findAll();
  }

  @Get('series')
  findEpisodes(
    @Query() id: number,
    @Query() query: EpisodeQueryDto
  ): Promise<Episodes[]> {
    return this.episodesService.findEpisodes(id, query.season, query.episode);
  }

  @Post('admin')
  async createEpisodes(@Req() req: Request, @Body() createEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
    await this.authHelper.validateUser(req, this.adminsService);
    return this.episodesService.create(createEpisodesDto);
  }
} 