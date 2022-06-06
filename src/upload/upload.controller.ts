import { Controller, Param, Post, UploadedFile, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../shared/guards/auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { memoryStorage } from 'multer'
import { GetUser } from '../shared/decorators/get-user.decorator'
import { UploadService } from './upload.service'
import { FastifyFileInterceptor } from 'nest-fastify-multer'
import { avatarFileFilter } from './filters/avatar.filter'
import { BufferedFile } from '../shared/interfaces/buffered-file.interface'
import { GetIdParam } from '../shared/dtos/get-id-param.dto'
import { postCoverFileFilter } from './filters/post.cover.filter'

@ApiTags('Upload')
@Controller('upload')
@UseGuards(AuthGuard())
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post('avatar')
	@FastifyFileInterceptor('avatar', {
		storage: memoryStorage(),
		fileFilter: avatarFileFilter
	})
	async uploadAvatar(@UploadedFile() file: BufferedFile, @GetUser() user: User) {
		return await this.uploadService.updateUserAvatar({ userId: user.id, file })
	}

	@Post('post/:id')
	@FastifyFileInterceptor('cover', {
		storage: memoryStorage(),
		fileFilter: postCoverFileFilter
	})
	async uploadCover(
		@UploadedFile() file: BufferedFile,
		@GetUser() user: User,
		@Param() param: GetIdParam
	) {
		return await this.uploadService.updatePostCover({ userId: user.id, file }, param.id)
	}
}
