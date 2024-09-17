import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './DTO/favorites.entity';

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
}