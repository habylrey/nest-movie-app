import { Controller, Delete, Get, Param, Post, Body, ParseIntPipe, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './favorites.entity';
import { CreateFavoritesDto } from './DTO/create-favorites.dto';
import { IdDto } from '../common/DTO/id.dto'; 

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get('find')
  findOne(@Query('id', ParseIntPipe) id: number): Promise<Favorites> {
    
    return this.favoritesService.findOne(new IdDto(id));
  }

  @Delete('remove')
  removeOne(@Query('id', ParseIntPipe) id: number) {
    return this.favoritesService.removeOne(new IdDto(id));
  }

  @Post()
  create(@Body() createFavoritesDto: CreateFavoritesDto): Promise<Favorites> {
    return this.favoritesService.create(createFavoritesDto);
  }
}