import { Controller, Delete, Get, Param, Post, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './favorites.entity';
import { CreateFavoritesDto } from './DTO/create-favorites.dto';

@Controller('favorites')
export class FavoritesController {
    constructor(private   favoritesService: FavoritesService) {}
    @Get()
    findAll() {
        return this.favoritesService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Favorites> {
      return this.favoritesService.findOne(id);
    }
    @Delete(':id')
    removeOne(@Param('id') id: number) {
        return this.favoritesService.removeOne(id);
    }
    @Post()
    create(@Body() createFavoritesDto: CreateFavoritesDto): Promise<Favorites> {
      return this.favoritesService.create(createFavoritesDto);
    }
}