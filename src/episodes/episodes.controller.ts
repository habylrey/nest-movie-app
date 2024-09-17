import { Controller, Get, Param, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episodes } from './DTO/episodes.entity';

@Controller('episodes')
export class EpisodesController {
    constructor(private readonly episodesService: EpisodesService) {}
    @Get()
    findAll() {
        return this.episodesService.findAll()
    }
    @Get(':series_id')
    findEpisodes(@Param('series_id') series_id: number): Promise<Episodes[]> {
      return this.episodesService.findEpisodes(series_id);
    }
    @Get('all/search')
    getString(@Query('search') search: string) {
        return `query: ${search}`;
        //TODO : edit query & API structure : http://localhost:3000/episodes/all/search?search=myQuery
    }
}