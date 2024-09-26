import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['jwt'];

    if (!token) {
      return next();
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req['user'] = decoded;
    } catch (err) {
      return next();
    }
    next();
  }
}