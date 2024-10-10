import { Controller, Post, Body, Res, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './DTO/auth.dto';
import { UpdatePasswordDto } from '../users/DTO/update-password.dto';
import { UsersService } from '../users/users.service';
import { EmailService } from '../nodemailer/email.service';
@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService, private emailService: EmailService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    const jwt = await this.authService.login(user);
    response.cookie('jwt', jwt.access_token, { httpOnly: true });
    return { message: 'Logged in successfully', token: jwt.access_token, user: jwt.user };
  }
  @Patch('update-password')
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    const { email, newPassword } = updatePasswordDto;
    this.emailService.sendPasswordChangedEmail(email)
    return this.usersService.updatePassword(email, newPassword);
  }
}  