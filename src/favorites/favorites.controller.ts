import { Controller, Delete, Get, Req, Post, Body, ParseIntPipe, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './favorites.entity';
import { CreateFavoritesDto } from './DTO/create-favorites.dto';
import { IdDto } from '../common/DTO/id.dto'; 
import { AdminService } from '../admins/admins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthHelper } from '../auth/auth.helper';
import { Request } from 'express';
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get('find')
  findOne(@Req() req: Request): Promise<Favorites> {
    const user = req['user']; 
    return this.favoritesService.findOne(new IdDto(user.sub));
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