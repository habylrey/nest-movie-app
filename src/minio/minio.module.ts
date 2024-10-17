import { Module } from '@nestjs/common';
import { UploadController } from './minio.controller';

@Module({
  controllers: [UploadController],
})
export class UploadModule {}