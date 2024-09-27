import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.cookies['jwt'];

    if (!token) {
      return false; 
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      request['user'] = decoded; 
      return true; 
    } catch (err) {
      return false
    }
  }
}