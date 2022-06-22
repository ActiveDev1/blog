import {
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	UploadedFile,
	UseGuards
} from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { memoryStorage } from 'multer'
import { FastifyFileInterceptor } from 'nest-fastify-multer'
import { GetUser } from '../../shared/decorators/get-user.decorator'
import { GetIdParam } from '../../shared/dtos/get-id-param.dto'
import { AuthGuard } from '../../shared/guards/auth.guard'
import { BufferedFile } from '../../shared/interfaces/buffered-file.interface'
import { FileUploadDto } from './dtos/file-upload.dto'
import { Link } from './dtos/link.dto'
import { avatarFileFilter } from './filters/avatar.filter'
import { postCoverFileFilter } from './filters/post.cover.filter'
import { UploadService } from './upload.service'

@ApiTags('Upload')
@Controller('upload')
@UseGuards(AuthGuard())
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post('avatar')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Avatar image file',
		type: FileUploadDto
	})
	@ApiCreatedResponse({
		description: 'Avatar uploaded',
		type: Link
	})
	@FastifyFileInterceptor('avatar', {
		storage: memoryStorage(),
		fileFilter: avatarFileFilter
	})
	async uploadAvatar(@UploadedFile() file: BufferedFile, @GetUser() user: User) {
		return await this.uploadService.updateUserAvatar({ userId: user.id, file })
	}

	@Post('post/:id')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Avatar image file',
		type: FileUploadDto
	})
	@ApiCreatedResponse({
		description: 'Cover uploaded',
		type: Link
	})
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
