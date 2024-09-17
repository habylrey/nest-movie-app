import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genres } from './DTO/genres.entity';

@Injectable()
export class GenresService {
    constructor (
    @InjectRepository(Genres)
    private genresRepository: Repository<Genres>) {}

    findAll(): Promise<Genres[]> {
        return this.genresRepository.find()
    }
    findOne(id: number): Promise<Genres> {
        return this.genresRepository.findOneBy({ id })
    }
}