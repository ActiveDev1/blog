import { Module } from '@nestjs/common'
import { NestMinioModule } from 'nestjs-minio'
import { MinioService } from './minio.service'
import { NestMinioConfigs } from '../config'

@Module({
	imports: [NestMinioModule.register(NestMinioConfigs.config)],
	providers: [MinioService],
	exports: [MinioService]
})
export class MinioModule {}
