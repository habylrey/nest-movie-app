import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './DTO/series.entity';

@Injectable()
export class SeriesService {
    constructor (
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>) {}

    findAll(): Promise<Series[]> {
        return this.seriesRepository.find()
    }
    findOne(id: number): Promise<Series> {
        return this.seriesRepository.findOneBy({ id })
    }
}

