import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genres } from './genres.entity';
import { CreateGenresDto } from './DTO/create-genres.dto';
import { IdDto } from '../common/DTO/id.dto';

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genres)
        private genresRepository: Repository<Genres>
    ) {}

    findAll(): Promise<Genres[]> {
        return this.genresRepository.find();
    }

    async findOne(id: IdDto): Promise<Genres> {
        const genre = await this.genresRepository.findOneBy(id);
        if (!genre) {
            throw new NotFoundException(`Genre with ID ${id} not found`);
        }
        return genre;
    }

    async create(createGenresDto: CreateGenresDto): Promise<Genres> {
        const genre = this.genresRepository.create(createGenresDto);
        return this.genresRepository.save(genre);
    }
}