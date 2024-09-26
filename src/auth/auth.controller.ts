import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './DTO/auth.dto';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException(`Invalid credentials ${user}`);
    }
    const jwt = await this.authService.login(user);
    response.cookie('jwt', jwt.access_token, { httpOnly: true });
    return { message: 'Logged in successfully', token: jwt.access_token, user: jwt.user };
  }
}