import { Controller, Get, Param } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Genres } from './DTO/genres.entity';

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}
    @Get()
    findAll() {
        return this.genresService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Genres> {
      return this.genresService.findOne(id);
    }
}