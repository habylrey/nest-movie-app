import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genres } from './genres.entity';
import { CreateGenresDto } from './DTO/create-genres.dto';
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
    async create(createGenresDto: CreateGenresDto): Promise<Genres> {
        const genres = this.genresRepository.create(createGenresDto);
        return this.genresRepository.save(genres);
      }
}