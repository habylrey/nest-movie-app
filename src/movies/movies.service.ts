import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { CreateMoviesDto } from './DTO/create-movies.dto';
import { IdDto } from '../common/DTO/id.dto'; 

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(genreId?: number, directorId?: number): Promise<Movie[]> {
    const where: any = {};

    if (genreId) {
      where.genreId = genreId;
    }

    if (directorId) {
      where.directorId = directorId;
    }

    const movies = await this.movieRepository.find({ where });

    if (movies.length === 0) {
      if (genreId && directorId) {
        throw new NotFoundException(`No movies found for genre ${genreId} and director ${directorId}`);
      } else {
        throw new NotFoundException(`No movies found for director ${directorId}`);
      }
    }

    return movies;
  }

  async findOne(idDto: IdDto): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id: idDto.id });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${idDto.id} not found`);
    }
    return movie;
  }

  async create(createMoviesDto: CreateMoviesDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMoviesDto);
    return this.movieRepository.save(movie);
  }
}