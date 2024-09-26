import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['jwt'];

    if (!token) {
      throw new UnauthorizedException('Invalid or missing JWT token');
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET) as jwt.JwtPayload;
      if (!decoded || typeof decoded !== 'object' || !decoded.email) {
        throw new UnauthorizedException('Invalid token payload');
      }
      const user = await this.usersService.findOneByEmail(decoded.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      request.user = user; 
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired JWT token');
    }
  }
}