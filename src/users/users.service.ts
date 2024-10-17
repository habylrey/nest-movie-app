import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './DTO/create-user.dto';
import { IdDto } from '../common/DTO/id.dto'; 
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: IdDto): Promise<User> {
    const user = await this.usersRepository.findOneBy(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async updatePassword(email: string, newPassword: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    user.password = newPassword;
    await this.usersRepository.save(user);
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async remove(idDto: IdDto): Promise<void> {
    const result = await this.usersRepository.delete(idDto.id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${idDto.id} not found`);
    }
  }

  async getDone() {
    return { url: 'admin', message: 'Редактирование завершено успешно' };
  }
}
