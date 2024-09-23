import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './favorites.entity';
import { CreateFavoritesDto } from './DTO/create-favorites.dto';
import { IdDto } from '../common/DTO/id.dto'; 

@Injectable()
export class FavoritesService {
    constructor(
        @InjectRepository(Favorites)
        private favoritesRepository: Repository<Favorites>
    ) {}

    findAll(): Promise<Favorites[]> {
        return this.favoritesRepository.find();
    }

    async findOne(idDto: IdDto): Promise<Favorites> {
        const favorite = await this.favoritesRepository.findOneBy({ id: idDto.id });
        if (!favorite) {
            throw new NotFoundException(`Favorite with ID ${idDto.id} not found`);
        }
        return favorite;
    }

    async removeOne(idDto: IdDto): Promise<void> {
        const result = await this.favoritesRepository.delete(idDto.id);
        if (result.affected === 0) {
            throw new NotFoundException(`Favorite with ID ${idDto.id} not found`);
        }
    }

    async create(createFavoritesDto: CreateFavoritesDto): Promise<Favorites> {
        const favorites = this.favoritesRepository.create(createFavoritesDto);
        return this.favoritesRepository.save(favorites);
    }
}