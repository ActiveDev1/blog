import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { MinioModule } from 'src/minio/minio.module'
import { UserRepository } from 'src/user/users.repository'
import { UploadController } from './upload.controller'
import { PostRepository } from 'src/post/post.repository'

@Module({
	imports: [MinioModule],
	controllers: [UploadController],
	providers: [UploadService, UserRepository, PostRepository]
})
export class UploadModule {}
