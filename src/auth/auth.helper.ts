import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthHelper {
  async validateUser<T>(
    req: Request,
    service: { findByEmail: (email: string) => Promise<T> },
  ): Promise<T> {
    const user = req['user'];
    if (!user) {
      throw new UnauthorizedException('Invalid or missing JWT token');
    }

    const entity = await service.findByEmail(user.email);
    if (!entity) {
      throw new UnauthorizedException('User not found');
    }

    return ;
  }
}