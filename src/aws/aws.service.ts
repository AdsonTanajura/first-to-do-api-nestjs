// src/aws/aws.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AwsService {
  private s3: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');

    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');

    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY'
    );

    const bucket = this.configService.get<string>('AWS_S3_BUCKET_NAME');

    if (!region || !accessKeyId || !secretAccessKey || !bucket) {
      throw new BadRequestException(
        'AWS S3 configuration is incomplete. Check your .env variables.'
      );
    }

    this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    this.bucket = bucket;
  }

  async uploadFile(
    file: Express.Multer.File,
    folder = 'uploads'
  ): Promise<string> {
    const key = `${folder}/${uuid()}-${file.originalname}`;

    const params: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.send(new PutObjectCommand(params));

    return `https://${this.bucket}.s3.${this.configService.get<string>(
      'AWS_REGION'
    )}.amazonaws.com/${key}`;
  }
}
