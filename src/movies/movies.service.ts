import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { CreateMoviesDto } from './DTO/create-movies.dto';
import { IdDto } from '../common/DTO/id.dto'; 
import { GenresService } from '../genres/genres.service';
import { DirectorsService } from '../directors/directors.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private genreService: GenresService,
    private directorService: DirectorsService
  ) {}

  async findAll(genreId?: number, directorId?: number): Promise<Movie[]> {
    const where: any = {};

    if (genreId) {
      const genre = await this.genreService.findOne({id: genreId})
      if (!genre) throw new NotFoundException('Genre not found');
      where.genreId = genreId;
    }

    if (directorId) {
      const director = await this.directorService.findOne({id: directorId})
      if (!director) throw new NotFoundException('Director not found');
      where.directorId = directorId;
    }

    const movies = await this.movieRepository.find({ where });

    if (!movies)  throw new NotFoundException(`No movies found for director`);


    return movies;
  }

  async findOne(id: IdDto): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async create(createMoviesDto: CreateMoviesDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMoviesDto);
    return this.movieRepository.save(movie);
  }
}