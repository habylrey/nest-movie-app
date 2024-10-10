import { Injectable } from '@nestjs/common';
import { EditingGateway } from './editing.gateway';  
import { Editor } from '../common/interfaces/editor.interface';

@Injectable()
export class EditingService {
  constructor(private readonly editingGateway: EditingGateway) {}

  async startEditing(adminId: number, contact: string): Promise<boolean> {
    if (this.editingGateway.canEdit(adminId)) {
      this.editingGateway.startEditing({ adminId, contact });
      return true;
    }
    return false;
  }

  async stopEditing(adminId: number): Promise<boolean> {
    return this.editingGateway.stopEditing(adminId);
  }

  getEditingState(): { isEditing: boolean; editor: Editor | null } {  
    return this.editingGateway.getEditingState();
  }

}
