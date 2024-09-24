import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
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
    const where: FindOptionsWhere<Episodes> = { seriesId };

    if (seriesId) {
      const isSeries = this.episodesRepository.findOne({ where: { seriesId } });
      if (!isSeries) throw new NotFoundException('No episodes found');
    }

    if (season) {
      where.season = season;
      const isSeason = await this.episodesRepository.findOne({ where: { season } });
      if (!isSeason) throw new NotFoundException('No episodes found for this season');
    }
    if (episode) {
      where.episode = episode;
      const isEpisode = await this.episodesRepository.findOne({ where: { episode } });
      if (!isEpisode) throw new NotFoundException('No episodes found for this episode number');
    }
    const episodes = await this.episodesRepository.find({ where });

    if (!episodes || episodes.length === 0) {
      throw new NotFoundException('No episodes found matching the criteria');
    }

    return episodes;
  }

  create(createEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
    const episode = this.episodesRepository.create(createEpisodesDto);
    return this.episodesRepository.save(episode);
  }
}