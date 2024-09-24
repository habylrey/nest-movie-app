import { Controller, Delete, Get, Param, Post, Body, ParseIntPipe } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Favorites> {
    const idDto = new IdDto();
    idDto.id = id;
    return this.favoritesService.findOne(idDto);
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number) {
    const idDto = new IdDto();
    idDto.id = id;
    return this.favoritesService.removeOne(idDto);
  }

  @Post()
  create(@Body() createFavoritesDto: CreateFavoritesDto): Promise<Favorites> {
    return this.favoritesService.create(createFavoritesDto);
  }
}