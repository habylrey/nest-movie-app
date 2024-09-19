import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './DTO/movies.entity';
import { CreateMoviesDto } from './DTO/create-movies.dto';

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
    async findEpisodesByGenre(genre_id: number): Promise<Movie[]> {
        return this.movieRepository.findBy({ genre_id })
    }
    async findEpisodesByDirector(director_id: number): Promise<Movie[]> {
        return this.movieRepository.findBy({ director_id })
    }
    async findEpisodesByGenreAndDirector(genre_id: number, director_id: number): Promise<Movie[]> {
        return this.movieRepository.findBy({ genre_id, director_id })
    }
    async create(createMoviesDto: CreateMoviesDto): Promise<Movie> {
        const Movies = this.movieRepository.create(createMoviesDto);
        return this.movieRepository.save(Movies);
      }
}

