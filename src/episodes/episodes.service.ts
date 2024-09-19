import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episodes } from './DTO/episodes.entity';
import { CreateEpisodesDto } from './DTO/create-episodes.dto';
@Injectable()
export class EpisodesService {
    constructor (
    @InjectRepository(Episodes)
    private episodesRepository: Repository<Episodes>) {}

    findAll(): Promise<Episodes[]> {
        return this.episodesRepository.find()
    }
    findEpisodes(series_id: number): Promise<Episodes[]> {
        return this.episodesRepository.findBy({ series_id })
    }
    findEpisodesBySeason(season: number): Promise<Episodes[]> {
        return this.episodesRepository.findBy({ season })
    }
    async findEpisodesBySeriesAndSeason(series_id: number, season: number): Promise<Episodes[]> {
        return this.episodesRepository.findBy({ series_id, season })
    }

    async findEpisodesBySeriesSeasonAndEpisode(series_id: number, season: number, episode: number): Promise<Episodes[]> {
        return this.episodesRepository.findBy({ series_id, season, episode })
    }
    async create(createEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
        const Episodes = this.episodesRepository.create(createEpisodesDto);
        return this.episodesRepository.save(Episodes);
      }
}