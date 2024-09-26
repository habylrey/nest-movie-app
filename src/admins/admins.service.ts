import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  async findOne(id: IdDto): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy(id);
    if (!admin) throw new NotFoundException('Not found')
    return admin
  }
  async findByEmail(email: any): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy({email});
    if (!admin) throw new ForbiddenException(`Insufficient rights to perform this action`);
    return admin
  }
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }

  async remove(id: IdDto): Promise<void> {
    const admin = await this.adminRepository.findOneBy(id);
    if (!admin) throw new NotFoundException('Not found')
    await this.adminRepository.delete(id);
  }
}