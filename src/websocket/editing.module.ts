import { Module } from '@nestjs/common';
import { EditingService } from './editing.service';
import { EditingGateway } from './editing.gateway';

@Module({
  providers: [EditingService, EditingGateway],
  exports: [EditingService], 
})
export class WebsocketModule {}