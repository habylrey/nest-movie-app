import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './series.entity';
import { CreateSeriesDto } from './DTO/create-series.dto';
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
    async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
        const series = this.seriesRepository.create(createSeriesDto);
        return this.seriesRepository.save(series);
      }
}

