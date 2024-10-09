import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export interface Editor {
  adminId: number;
  contact: string;
}

@WebSocketGateway()
export class EditingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  public editingState = { isEditing: false, editor: null as Editor | null };

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    if (this.editingState.isEditing && this.editingState.editor?.contact === client.id) {
      this.stopEditing(this.editingState.editor.adminId);
    }
  }

  @SubscribeMessage('startEditing')
  handleStartEditing(client: Socket, payload: Editor): void {
    console.log(`Received startEditing from ${payload.contact} (adminId: ${payload.adminId})`);

    if (this.canEdit(payload.adminId)) {
      this.startEditing(payload);
      this.scheduleAutoStop(payload.adminId, client);
    } else {
      console.log(`Editing blocked for ${payload.contact}`);
      client.emit('editingBlocked', this.editingState);
    }
  }

  @SubscribeMessage('stopEditing')
  handleStopEditing(client: Socket, adminId: number): void {
    console.log(`Received stopEditing from adminId: ${adminId}`);
    if (this.stopEditing(adminId)) {
      this.server.emit('editingStopped');
    } else {
      console.log(`Stop editing request ignored: not editing or wrong adminId`);
      client.emit('stopEditingError', { message: 'Unable to stop editing' });
    }
  }

  public canEdit(adminId: number): boolean {
    return !this.editingState.isEditing || this.editingState.editor?.adminId === adminId;
  }

  public startEditing(editor: Editor): void {
    this.editingState = { isEditing: true, editor };
    console.log(`Editing started: ${JSON.stringify(this.editingState)}`);
    this.server.emit('editingStarted', this.editingState);
  }

  public scheduleAutoStop(adminId: number, client: Socket): void {
    setTimeout(() => {
      if (this.editingState.isEditing && this.editingState.editor?.adminId === adminId) {
        console.log(`Auto stopping editing for adminId: ${adminId}`);
        this.stopEditing(adminId);
      }
    }, 30000);
  }

  public stopEditing(adminId: number): boolean {
    if (this.editingState.isEditing && this.editingState.editor?.adminId === adminId) {
      this.editingState = { isEditing: false, editor: null };
      console.log(`Editing stopped: ${JSON.stringify(this.editingState)}`);
      return true;
    }
    return false;
  }

  public getEditingState(): { isEditing: boolean; editor: Editor | null } {
    return this.editingState;
  }
}
