import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directors } from './DTO/directors.entity';

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
}