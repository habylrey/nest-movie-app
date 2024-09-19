import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episodes } from './episodes.entity';
import { CreateEpisodesDto } from './DTO/create-episodes.dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episodes)
    private episodesRepository: Repository<Episodes>,
  ) {}

  findAll(): Promise<Episodes[]> {
    return this.episodesRepository.find();
  }

  async findEpisodes(seriesId: number, season?: number, episode?: number): Promise<Episodes[]> {
    const queryBuilder = this.episodesRepository.createQueryBuilder('episodes');

    queryBuilder.where('episodes.seriesId = :seriesId', { seriesId });
    const seriesCount = await queryBuilder.getCount();
    if (seriesCount === 0) {
      throw new NotFoundException(`Series with id ${seriesId} not found`);
    }

    if (season) {
      queryBuilder.andWhere('episodes.season = :season', { season });
      const seasonCount = await queryBuilder.getCount();
      if (seasonCount === 0) {
        throw new NotFoundException(`Season ${season} for series ${seriesId} not found`);
      }
    }

    if (episode) {
      queryBuilder.andWhere('episodes.episode = :episode', { episode });
      const episodeCount = await queryBuilder.getCount();
      if (episodeCount === 0) {
        throw new NotFoundException(`Episode ${episode} for season ${season} and series ${seriesId} not found`);
      }
    }

    return queryBuilder.getMany();
  }

  async create(createEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
    const episodes = this.episodesRepository.create(createEpisodesDto);
    return this.episodesRepository.save(episodes);
  }
}