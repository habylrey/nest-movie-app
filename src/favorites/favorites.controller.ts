import { Controller, Get, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './DTO/favorites.entity';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}
    @Get()
    findAll() {
        return this.favoritesService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Favorites> {
      return this.favoritesService.findOne(id);
    }
}