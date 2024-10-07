import { Controller, Get, Req, Post, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MovieService } from './movies.service';
import { Movie } from './movies.entity';
import { CreateMoviesDto } from './DTO/create-movies.dto';
import { IdDto } from '../common/DTO/id.dto'; 
import { MovieQueryDto } from '../common/DTO/query.dto';
import { AdminService } from '../admins/admins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '../auth/auth.helper';
import { AuthRequest } from '../common/interfaces/request.interface';
import { Request } from 'express';
@Controller('movie')
export class MoviesController {
  constructor(private AuthGuard: AuthGuard, private adminsService: AdminService, private movieService: MovieService,) {}

  @Get()
  findAll(@Query() query: MovieQueryDto) {
    return this.movieService.findAll(query.genreId, query.directorId);
  }
  @Get('find')
  findOne(@Query('id', ParseIntPipe) id: number): Promise<Movie> {
    
    return this.movieService.  findOne(new IdDto(id));
  }

  @Post('admin')
  @UseGuards(JwtAuthGuard) 
  @UseGuards(AuthGuard)
  async createMovie(@Req() req: AuthRequest,  @Body() createMoviesDto: CreateMoviesDto) {
    return this.movieService.create(createMoviesDto);
  }
}