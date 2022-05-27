import { Controller, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { UploadService } from './upload.service'

@ApiTags('Upload')
@Controller('upload')
@UseGuards(AuthGuard())
export class UserController {
	constructor(private readonly uploadService: UploadService) {}
}
