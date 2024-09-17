import { Controller, Get, Param } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { Directors } from './DTO/directors.entity';

@Controller('directors')
export class DirectorsController {
    constructor(private readonly directorsService: DirectorsService) {}
    @Get()
    findAll() {
        return this.directorsService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Directors> {
      return this.directorsService.findOne(id);
    }
}