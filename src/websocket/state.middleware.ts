import { Injectable, NestMiddleware, UseGuards } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EditingGateway } from './editing.gateway';
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Injectable()
@UseGuards(JwtAuthGuard)
export class EditingCheckMiddleware implements NestMiddleware {
  constructor(private readonly editingGateway: EditingGateway) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.['jwt'];

    if (!token) {
      return res.status(401).json({ message: 'Authentication token not found' });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET) as jwt.JwtPayload;
      const adminId = decoded.id;
      const currentEditor = this.editingGateway.editingState.editor;

      if (this.editingGateway.editingState.isEditing && currentEditor?.adminId !== adminId) {
        return res.status(403).json({
          message: 'Resource is being edited by another admin',
          editor: currentEditor,
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
