import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { CreateMoviesDto } from './DTO/create-movies.dto';

//TODO add JS Doc
@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(genreId?: number, directorId?: number): Promise<Movie[]> {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');

    if (genreId) {
      queryBuilder.andWhere('movie.genreId = :genreId', { genreId });
      const genreCount = await queryBuilder.getCount();
      if (genreCount === 0) {
        throw new NotFoundException(`Genre with id ${genreId} not found`);
      }
    }

    if (directorId) {
      queryBuilder.andWhere('movie.directorId = :directorId', { directorId });
      const directorCount = await queryBuilder.getCount();
      if (directorCount === 0) {
        throw new NotFoundException(`Director with id ${directorId} not found`);
      }
    }

    return queryBuilder.getMany();
  }

  findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOneBy({ id });
  }

  async create(createMoviesDto: CreateMoviesDto): Promise<Movie> {
    const movies = this.movieRepository.create(createMoviesDto);
    return this.movieRepository.save(movies);
  }
}