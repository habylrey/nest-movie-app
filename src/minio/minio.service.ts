import { Injectable } from '@nestjs/common';
import { Client } from 'minio';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { Readable } from 'stream';
import * as path from 'path';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'e6eFwz0qry5Wb5Ra8bUh',
      secretKey: 'ro2zN5SO4LlnCAIO6olcgFZZhRrMZVoTCzngv1XE',
    });
  }

  async uploadFile(bucketName: string, objectName: string, file: Buffer): Promise<void> {
    await this.minioClient.putObject(bucketName, objectName, file);
  }

  async syncLocalToMinio(localPath: string, bucketName: string): Promise<void> {
    const fileName = localPath.split('/').pop();
    const fileBuffer = await fsPromises.readFile(localPath);
    await this.uploadFile(bucketName, fileName, fileBuffer);
  }

  async downloadAllFiles(bucketName: string, outputDir: string, prefix: string): Promise<void> {
    const stream = this.minioClient.listObjects(bucketName, prefix, true);
    for await (const item of stream) {
      const filePath = path.join(outputDir, item.name);

      const dir = path.dirname(filePath);
      await fsPromises.mkdir(dir, { recursive: true });

      const fileStream: Readable = await this.minioClient.getObject(bucketName, item.name);
      const writeStream = fs.createWriteStream(filePath);

      await new Promise((resolve, reject) => {
        fileStream.pipe(writeStream);
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });
    }
  }
}