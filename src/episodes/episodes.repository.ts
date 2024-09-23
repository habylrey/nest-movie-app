import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Episodes } from './episodes.entity';
import { CreateEpisodesDto } from './DTO/create-episodes.dto';

@Injectable()
export class EpisodesRepository extends Repository<Episodes> {
  constructor(
    @InjectRepository(Episodes)
    private episodesRepository: Repository<Episodes>,
    private dataSource: DataSource
  ) {
    super(episodesRepository.target, episodesRepository.manager, episodesRepository.queryRunner);
  }
  async findEpisodes(seriesId: number, season?: number, episode?: number): Promise<Episodes[]> {
    let query = `SELECT * FROM episodes WHERE "series_id" = $1`;
    const queryParams: any[] = [seriesId];

    if (season) {
      query += ` AND "season" = $2`;
      queryParams.push(season);
    }

    if (episode) {
      query += season ? ` AND "episode" = $3` : ` AND "episode" = $2`;
      queryParams.push(episode);
    }

    return this.dataSource.query(query, queryParams);
  }

  async createEpisode(createEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
    const episode = this.create(createEpisodesDto);
    return this.save(episode);
  }
}