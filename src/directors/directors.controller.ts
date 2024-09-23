import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { Directors } from './directors.entity';
import { CreateDirectorsDto } from './DTO/create-directors.dto';

@Controller('directors')
export class DirectorsController {
    constructor(private   directorsService: DirectorsService) {}
    @Get()
    findAll() {
        return this.directorsService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Directors> {
      return this.directorsService.findOne(id);
    }
    @Post('admin')
    createDirectors(@Body() createDirectorsDto: CreateDirectorsDto) {
        return this.directorsService.create(createDirectorsDto);
    }

}
