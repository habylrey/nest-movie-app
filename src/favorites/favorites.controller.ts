import { Controller, Delete, Get, Req, Post, Body, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './favorites.entity';
import { CreateFavoritesDto } from './DTO/create-favorites.dto';
import { IdDto } from '../common/DTO/id.dto'; 
import { AuthUser } from '../auth/auth.user';
import { Person } from '../common/interfaces/request.interface';
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get('find')
  findOne(@AuthUser() person: Person): Promise<Favorites> {
    return this.favoritesService.findOne(person);
  }

  @Delete('remove')
  removeOne(@Query() query: IdDto) {
    return this.favoritesService.removeOne(query);
  }

  @Post()
  create(@Body() createFavoritesDto: CreateFavoritesDto): Promise<Favorites> {
    return this.favoritesService.create(createFavoritesDto);
  }
}