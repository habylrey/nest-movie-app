import { Controller, Get, UseGuards, Post, Body, Delete, Req,  Redirect, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './DTO/create-user.dto';
import { AdminService } from '../admins/admins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '../auth/auth.helper';
import { AuthUser } from '../auth/auth.user';
import { Person } from '../common/interfaces/request.interface';
import { AuthRequest } from '../common/interfaces/request.interface';
import { EmailService } from '../nodemailer/email.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { EditingService } from '../websocket/editing.service';
@Controller('user')
export class UsersController {
  constructor(private authGuard: AuthGuard, private usersService: UsersService,
    private adminsService: AdminService, private emailService: EmailService, private editingService: EditingService) {}
  @Get('admin')
  @UseGuards(JwtAuthGuard) 
  @UseGuards(AuthGuard)
  async findAll(@Req() req: AuthRequest) {
    return this.usersService.findAll();
  }
  @Get('done')
  @UseGuards(JwtAuthGuard) 
  getDone(@AuthUser() person: Person) {
    this.editingService.stopEditing(person.id)
    return this.usersService.getDone()
}
 

  @Get()
  @UseGuards(JwtAuthGuard) 
  findOne(@AuthUser() person: Person): Promise<User> {
    console.log(person, 'person')
    return this.usersService.findOne(person);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Delete('remove')
  remove(@AuthUser() person: Person): Promise<void> {
    return this.usersService.remove(person);
  }
}