import { Module } from '@nestjs/common'
import { NestMinioModule } from 'nestjs-minio'
import { NestMinioConfigs } from '../../../shared/config'
import { MinioService } from './minio.service'

@Module({
	imports: [NestMinioModule.register(NestMinioConfigs.config)],
	providers: [MinioService],
	exports: [MinioService]
})
export class MinioModule {}
