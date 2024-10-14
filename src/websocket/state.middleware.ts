import { Injectable, NestMiddleware, UseGuards } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EditingGateway } from './editing.gateway';
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmailService } from '../nodemailer/email.service';

@Injectable()
@UseGuards(JwtAuthGuard)
export class EditingCheckMiddleware implements NestMiddleware {
  constructor(
    private readonly editingGateway: EditingGateway, 
    private readonly emailService: EmailService,
  ) {}

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
        this.waitForFreeRoom().then(() => {
          this.editingGateway.server.emit('roomIsFree', { message: 'Комната теперь свободна' });
          this.emailService.sendRoomIsFree(decoded.email, '/user');
          next();
        }).catch(() => {
          return res.status(500).json({ message: 'Internal server error' });
        });

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

  private async waitForFreeRoom(): Promise<void> {
    while (this.editingGateway.editingState.isEditing) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}