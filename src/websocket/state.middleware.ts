import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EditingGateway } from './editing.gateway';

@Injectable()
export class EditingCheckMiddleware implements NestMiddleware {
  constructor(private readonly editingGateway: EditingGateway) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (this.editingGateway.editingState.isEditing) {
      return res.status(403).json({
        message: 'Resource is being edited by another admin',
        editor: this.editingGateway.editingState.editor,
      });
    }
    next();
  }
}