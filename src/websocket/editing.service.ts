import { Injectable } from '@nestjs/common';
import { EditingGateway } from './editing.gateway';  
import { Editor } from '../common/interfaces/editor.interface';
import { RedisService } from '../redis/redis.service'; 

@Injectable()
export class EditingService {
  constructor(
    private readonly editingGateway: EditingGateway,
    private readonly redisService: RedisService, 
  ) {}

  async startEditing(adminId: number, contact: string): Promise<boolean> {
    if (this.editingGateway.canEdit(adminId)) {
      const editor = { adminId, contact };
      this.editingGateway.startEditing(editor);
      await this.redisService.setEditingState({ isEditing: true, editor }); 
      return true;
    }
    return false;
  }

  async stopEditing(adminId: number): Promise<boolean> {
    if (this.editingGateway.stopEditing(adminId)) {
      await this.redisService.setEditingState({ isEditing: false, editor: null }); 
      return true;
    }
    return false;
  }

  async getEditingState(): Promise<{ isEditing: boolean; editor: Editor | null }> {
    const editingState = await this.redisService.getEditingState(); 
    return editingState || { isEditing: false, editor: null };
  }
}
