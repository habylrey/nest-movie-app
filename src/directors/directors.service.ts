import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directors } from './directors.entity';
import { CreateDirectorsDto } from './DTO/create-directors.dto';
import { IdDto } from '../common/DTO/id.dto';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Directors)
    private directorsRepository: Repository<Directors>,
  ) {}

  findAll(): Promise<Directors[]> {
    return this.directorsRepository.find();
  }

  async findOne(id: IdDto): Promise<Directors> {
    const director = await this.directorsRepository.findOneBy(id);
    if (!director) {
      throw new NotFoundException(`Director with ID ${id} not found`);
    }
    return director;
  }

  async create(createDirectorsDto: CreateDirectorsDto): Promise<Directors> {
    const directors = this.directorsRepository.create(createDirectorsDto);
    return this.directorsRepository.save(directors);
  }
}