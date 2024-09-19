import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directors } from './DTO/directors.entity';
import { CreateDirectorsDto } from './DTO/create-directors.dto';
@Injectable()
export class DirectorsService {
    constructor (
    @InjectRepository(Directors)
    private directorsRepository: Repository<Directors>) {}

    findAll(): Promise<Directors[]> {
        return this.directorsRepository.find()
    }
    findOne(id: number): Promise<Directors> {
        return this.directorsRepository.findOneBy({ id })
    }
    async create(createDirectorsDto: CreateDirectorsDto): Promise<Directors> {
        const Directors = this.directorsRepository.create(createDirectorsDto);
        return this.directorsRepository.save(Directors);
      }
}