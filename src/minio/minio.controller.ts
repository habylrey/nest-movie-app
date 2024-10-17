import { Controller, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';

@Controller('upload')
export class UploadController {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      endpoint: process.env.ENDPOINT,
      signatureVersion: 'v4',
      s3ForcePathStyle: true,
      accessKeyId: process.env.ACCESSKEY_MINIO,
      secretAccessKey: process.env.SECRETKEY_MINIO,
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const params = {
      Bucket: 'nest-bucket',
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    try {
      const data = await this.s3.upload(params).promise();
      return { url: data.Location, message: 'Successful download files from Minio' };
    } catch (error) {
      throw new HttpException('Error uploading file: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('download')
  async downloadFile(@UploadedFile() file: Express.Multer.File) {
    const params = {
      Bucket: 'nest-bucket',
      Key: file.originalname,
    };

    try {
      const data = await this.s3.getObject(params).promise();
      const fileUrl = this.s3.getSignedUrl('getObject', {
        Bucket: params.Bucket,
        Key: params.Key,
        Expires: 60 * 60, 
      });

      return { url: fileUrl, message: 'Successful download files to Minio'  };
    } catch (error) {
      throw new HttpException('Error downloading file: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
