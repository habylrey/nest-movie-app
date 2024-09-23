import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { Directors } from './directors.entity';
import { CreateDirectorsDto } from './DTO/create-directors.dto';
import { IdDto } from '../common/DTO/id.dto';

@Controller('directors')
export class DirectorsController {
    constructor(private directorsService: DirectorsService) {}

    @Get()
    findAll() {
        return this.directorsService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: IdDto): Promise<Directors> {
      return this.directorsService.findOne(params.id);
    }

    @Post('admin')
    createDirectors(@Body() createDirectorsDto: CreateDirectorsDto) {
        return this.directorsService.create(createDirectorsDto);
    }
}