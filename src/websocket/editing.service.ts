import { Injectable } from '@nestjs/common';
import { EditingGateway } from './editing.gateway';

@Injectable()
export class EditingService {
  constructor(private readonly editingGateway: EditingGateway) {}

  async startEditing(adminId: number, contact: string): Promise<boolean> {
    if (!this.editingGateway.editingState.isEditing) {
      this.editingGateway.editingState.isEditing = true;
      this.editingGateway.editingState.editor = { adminId, contact };
      this.editingGateway.server.emit('editingStarted', this.editingGateway.editingState);
      setTimeout(() => {
        this.stopEditing(adminId);
      }, 30000);

      return true;
    }
    return false;
  }

  async stopEditing(adminId: number): Promise<boolean> {
    if (this.editingGateway.editingState.isEditing && this.editingGateway.editingState.editor?.adminId === adminId) {
      this.editingGateway.editingState.isEditing = false;
      this.editingGateway.editingState.editor = null;
      this.editingGateway.server.emit('editingStopped');
      return true;
    }
    return false;
  }

  getEditingState() {
    return this.editingGateway.editingState;
  }
}