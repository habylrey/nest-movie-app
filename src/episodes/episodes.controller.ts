import { Controller, Get, Req, Query, Post, Body, UseGuards } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episodes } from './episodes.entity';
import { CreateEpisodesDto } from './DTO/create-episodes.dto';
import { EpisodeQueryDto } from '../common/DTO/query.dto';
import { IdDto } from '../common/DTO/id.dto';
import { AdminService } from '../admins/admins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '../auth/auth.helper';
import { AuthRequest } from '../interfaces/request.interface';
import { Request } from 'express';
@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private AuthGuard: AuthGuard,
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
  @UseGuards(JwtAuthGuard) 
  @UseGuards(AuthGuard)
  async createEpisodes( @Body() createEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
    return this.episodesService.create(createEpisodesDto);
  }
} 