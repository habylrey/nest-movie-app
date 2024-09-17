import { Controller, Get, Param, Post, Body, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './DTO/users.entity';
import { CreateUserDto } from './DTO/create-user.dto';
import { Response } from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}