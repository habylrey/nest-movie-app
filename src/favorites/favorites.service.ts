import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './DTO/favorites.entity';
import { CreateFavoritesDto } from './DTO/create-favorites.dto';
@Injectable()
export class FavoritesService {
    constructor (
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>) {}

    findAll(): Promise<Favorites[]> {
        return this.favoritesRepository.find()
    }
    findOne(id: number): Promise<Favorites> {
        return this.favoritesRepository.findOneBy({ id })
    }
    removeOne(id: number): void {
        this.favoritesRepository.delete({id})
    }
    async create(createFavoritesDto: CreateFavoritesDto): Promise<Favorites> {
        const Favorites = this.favoritesRepository.create(createFavoritesDto);
        return this.favoritesRepository.save(Favorites);
      }
    
}