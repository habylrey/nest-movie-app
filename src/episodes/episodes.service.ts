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
    const query: any = { seriesId };
    
    if (season !== undefined) {
      query.season = season;
    }
    
    if (episode !== undefined) {
      query.episode = episode;
    }

    const episodes = await this.episodesRepository.find({ where: query });

    if (episodes.length === 0) {
      throw new NotFoundException('No episodes found matching the criteria');
    }

    return episodes;
  }

  create(createEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
    const episode = this.episodesRepository.create(createEpisodesDto);
    return this.episodesRepository.save(episode);
  }
}