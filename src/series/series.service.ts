import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './series.entity';
import { CreateSeriesDto } from './DTO/create-series.dto';
import { IdDto } from '../common/DTO/id.dto';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}

  findAll(): Promise<Series[]> {
    return this.seriesRepository.find();
  }

  async findOne(id: IdDto): Promise<Series> {
    const series = await this.seriesRepository.findOneBy(id);
    if (!series) {
      throw new NotFoundException(`Series with ID ${id} not found`);
    }
    return series;
  }

  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    const series = this.seriesRepository.create(createSeriesDto);
    return this.seriesRepository.save(series);
  }
}