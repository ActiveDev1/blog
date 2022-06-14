import { Module } from '@nestjs/common'
import { PostRepository } from '../post/repositories/post.repository'
import { MinioModule } from '../../modules/services/minio/minio.module'
import { UserRepository } from '../../modules/user/users.repository'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

@Module({
	imports: [MinioModule],
	controllers: [UploadController],
	providers: [UploadService, UserRepository, PostRepository]
})
export class UploadModule {}
