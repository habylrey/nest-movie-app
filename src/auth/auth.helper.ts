import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { AdminService } from '../admins/admins.service';
import { EditingService } from '../websocket/editing.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly adminService: AdminService,
    private readonly editingService: EditingService,
  ) {}

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
  
      const user = await this.adminService.findByEmail(decoded.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      request.user = user;
  
      const isEditing = await this.editingService.getEditingState();
      if (!isEditing) {
        throw new UnauthorizedException('Failed to retrieve editing state');
      }
  
      if (isEditing.isEditing && isEditing.editor.adminId !== decoded.id) {
        return false; 
      }
  
      if (!isEditing.isEditing) {
        await this.editingService.startEditing(decoded.id, decoded.email);
      }
  
      return true;
    } catch (err) {
      console.error('Token validation error:', err);
      throw new UnauthorizedException('Token validation failed');
    }
  }
}  