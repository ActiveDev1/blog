import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { NestMinioService } from 'nestjs-minio'
import { NestMinioConfigs } from '../config'

@Injectable()
export class MinioService {
	constructor(private readonly minio: NestMinioService) {}

	private readonly bucketName = NestMinioConfigs.bucket
	private readonly baseUrl = `${NestMinioConfigs.config.endPoint}:${NestMinioConfigs.config.port}/${NestMinioConfigs.config.endPoint}/`

	public get client() {
		return this.minio.getMinio()
	}
}
