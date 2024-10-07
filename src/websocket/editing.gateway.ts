import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EditingGateway {
  @WebSocketServer()
  server: Server;

  editingState = {
    isEditing: false,
    editor: null as { adminId: number; contact: string } | null,
  };

  @SubscribeMessage('startEditing')
  handleStartEditing(client: Socket, payload: { adminId: number; contact: string }): void {
    if (!this.editingState.isEditing) {
      this.editingState.isEditing = true;
      this.editingState.editor = payload;
      this.server.emit('editingStarted', this.editingState);
      
      setTimeout(() => {
        if (this.editingState.isEditing && this.editingState.editor?.adminId === payload.adminId) {
          this.handleStopEditing(client, payload.adminId);
        }
      }, 30000);
    } else {
      client.emit('editingBlocked', this.editingState);
    }
  }

  @SubscribeMessage('stopEditing')
  handleStopEditing(client: Socket, adminId: number): void {
    if (this.editingState.isEditing && this.editingState.editor?.adminId === adminId) {
      this.editingState.isEditing = false;
      this.editingState.editor = null;
      this.server.emit('editingStopped');
    }
  }
}