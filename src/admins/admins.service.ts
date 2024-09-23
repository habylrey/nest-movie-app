import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admins.entity';
import { CreateAdminDto } from './DTO/create-admin.dto';
import { IdDto } from '../common/DTO/id.dto'; 

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  findOne(idDto: IdDto): Promise<Admin> {
    return this.adminRepository.findOneBy({ id: idDto.id });
  }
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }

  async remove(idDto: IdDto): Promise<void> {
    await this.adminRepository.delete({id: idDto.id});
  }
}