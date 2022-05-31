import { Controller, Post, UploadedFile, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../shared/guards/auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { memoryStorage } from 'multer'
import { GetUser } from '../shared/decorators/get-user.decorator'
import { UploadService } from './upload.service'
import { FastifyFileInterceptor } from 'nest-fastify-multer'
import { avatarFileFilter } from './filters/avatar.filter'
import { BufferedFile } from '../shared/interfaces/buffered-file.interface'

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
		return await this.uploadService.updateUserAvatar(user, file)
	}
}
