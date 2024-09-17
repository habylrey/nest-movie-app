import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episodes } from './DTO/episodes.entity';

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
}