import { Injectable } from '@nestjs/common';
import { EditingGateway, Editor } from './editing.gateway';  

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
