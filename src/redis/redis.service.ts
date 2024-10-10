import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: +process.env.REDIS_PORT || 6379,
    });

    this.client.on('error', (error) => {
      this.logger.error(`Redis error: ${error}`);
    });
  }

  async setEditingState(state: { isEditing: boolean; editor: any }): Promise<void> {
    await this.client.set('editingState', JSON.stringify(state));
  }

  async getEditingState(): Promise<{ isEditing: boolean; editor: any } | null> {
    const state = await this.client.get('editingState');
    return state ? JSON.parse(state) : null;
  }

  async setSession(sessionId: string, data: any): Promise<void> {
    await this.client.set(sessionId, JSON.stringify(data));
  }

  async getSession(sessionId: string): Promise<any> {
    const session = await this.client.get(sessionId);
    return session ? JSON.parse(session) : null;
  }
}
