import { Controller, Get, Param, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episodes } from './DTO/episodes.entity';

@Controller('episodes')
export class EpisodesController {
    constructor(private readonly episodesService: EpisodesService) {}

    @Get()
    async findAll(): Promise<Episodes[]> {
        return this.episodesService.findAll();
    }
    @Get(':series_id')
    findEpisodes(
        @Param('series_id') series_id: number,
        @Query('s') season: number,
        @Query('ep') episode: number,
    ): Promise<Episodes[]> {
        if (season && episode) {
            return this.episodesService.findEpisodesBySeriesSeasonAndEpisode(series_id, season, episode);
        } else if (season) {
            return this.episodesService.findEpisodesBySeriesAndSeason(series_id, season);
        } else {
            return this.episodesService.findEpisodes(series_id);
        }
    }
}