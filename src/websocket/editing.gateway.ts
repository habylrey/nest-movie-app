import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../redis/redis.service'; 
export interface Editor {
  adminId: number;
  contact: string;
}

@WebSocketGateway()
export class EditingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  public editingState = { isEditing: false, editor: null };

  constructor( readonly redisService: RedisService) {
    this.loadEditingState();
  }

  async loadEditingState() {
    const state = await this.redisService.getEditingState();
    if (state) {
      this.editingState = state;
    }
  }
  handleConnection(client: Socket) {
  }

  handleDisconnect(client: Socket) {
    if (this.editingState.isEditing && this.editingState.editor?.contact === client.id) {
      this.stopEditing(this.editingState.editor.adminId);
    }
  }

  @SubscribeMessage('startEditing')
  handleStartEditing(client: Socket, payload: Editor): void {
    this.server.emit('startEditing')
    if (this.canEdit(payload.adminId)) {
      this.startEditing(payload);
      this.scheduleAutoStop(payload.adminId, client);
    } else {
      client.emit('editingBlocked', this.editingState);
    }
  }

  @SubscribeMessage('stopEditing')
  handleStopEditing(client: Socket, adminId: number): void {
    if (this.stopEditing(adminId)) {
      this.server.emit('editingStopped');
    } else {
      client.emit('stopEditingError', { message: 'Unable to stop editing' });
    }
  }
  @SubscribeMessage('getEditingState')
  handleGetEditingState(client: Socket): void {
    client.emit('currentState', this.getEditingState());
  }

  public canEdit(adminId: number): boolean {
    return !this.editingState.isEditing || this.editingState.editor?.adminId === adminId;
  }

  public startEditing(editor: Editor): void {
    this.editingState = { isEditing: true, editor };
    this.server.emit('editingStarted', this.editingState);
  }

  public scheduleAutoStop(adminId: number, client: Socket): void {
    setTimeout(() => {
      if (this.editingState.isEditing) {
        this.stopEditing(adminId);
      }
    }, 30000);
  }

  public stopEditing(adminId: number): boolean {
    if (this.editingState.isEditing) {
      this.editingState = { isEditing: false, editor: null };
      return true;
    }
    return false;
  }

  public getEditingState(): { isEditing: boolean; editor: Editor | null } {
    return this.editingState;
  }
}