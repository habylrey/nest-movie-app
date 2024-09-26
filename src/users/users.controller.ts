import { Controller, Get, Query, Post, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './DTO/create-user.dto';
import { IdDto } from '../common/DTO/id.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('find')
  findOne(@Query('id', ParseIntPipe) id: number): Promise<User> {
    
    return this.usersService.  findOne(new IdDto(id));
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Delete('remove')
  remove(@Query('id', ParseIntPipe) id: number): Promise<void> {
    
    return this.usersService.remove(new IdDto(id));
  }
}
