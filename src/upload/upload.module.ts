import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { MinioModule } from 'src/minio/minio.module'
import { UserRepository } from 'src/user/users.repository'
import { UploadController } from './upload.controller'

@Module({
	imports: [MinioModule],
	controllers: [UploadController],
	providers: [UploadService, UserRepository]
})
export class UploadModule {}
