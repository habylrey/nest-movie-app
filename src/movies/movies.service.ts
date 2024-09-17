import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './DTO/movies.entity';

@Injectable()
export class MovieService {
    constructor (
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>) {}

    findAll(): Promise<Movie[]> {
        return this.movieRepository.find()
    }
    findOne(id: number): Promise<Movie> {
        return this.movieRepository.findOneBy({ id })
    }
    // async getByData(genre_id?: string, director_id?: string): Promise<Movie[]> {
    //     const query: { genre_id?: number; director_id?: number } = {};
      
    //     if (genre_id && !isNaN(Number(genre_id))) {
    //       query.genre_id = Number(genre_id);
    //     }
    //     if (director_id && !isNaN(Number(director_id))) {
    //       query.director_id = Number(director_id);
    //     }
    //     return this.movieRepository.find({ where: query });
    //   }
}

