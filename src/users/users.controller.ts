import { Controller, Get, UseGuards, Post, Body, Delete, UnauthorizedException, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './DTO/create-user.dto';
import { IdDto } from '../common/DTO/id.dto';
import { AdminService } from '../admins/admins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthHelper } from '../auth/auth.helper';
import { Request } from 'express';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private authHelper: AuthHelper, private usersService: UsersService, private adminsService: AdminService) {}
  @Get('admin')
  async findAll(@Req() req: Request) {
    await this.authHelper.validateUser(req, this.adminsService);
    return this.usersService.findAll();
  }

  @Get()
  findOne(@Req() req: Request): Promise<User> {
    const user = req['user']; 
    return this.usersService.findOne(new IdDto(user.sub));
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Delete('remove')
  remove(@Req() req: Request): Promise<void> {
    const user = req['user']; 
    return this.usersService.remove(new IdDto(user.sub));
  }
}
