import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards
} from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '../shared/guards/auth.guard'
import { GetIdParam } from '../shared/dtos/get-id-param.dto'
import { Public } from 'src/shared/decorators/public.decorator'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto'
import { GetUser } from 'src/shared/decorators/get-user.decorator'
import { User } from '@prisma/client'
import { GetUserInfoDto } from './dtos/get-user-info.dto'
import { GetEmailVerificationDto } from 'src/auth/dtos/get-email-verification.dto'

@ApiTags('User')
@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	@Public()
	async findOne(@Param() param: GetIdParam) {
		return await this.userService.findOne(param.id)
	}

	@Get(':id/profile')
	@Public()
	async findOneProfile(@Param() param: GetIdParam) {
		return await this.userService.findOneProfile(param.id)
	}

	@Patch('')
	async update(@GetUser() user: User, @Body() body: UpdateUserDto) {
		return await this.userService.update(user.id, body)
	}

	@Post('change-password')
	@HttpCode(HttpStatus.OK)
	async updatePassword(@GetUser() user: User, @Body() body: UpdateUserPasswordDto) {
		await this.userService.updatePassword(user, body)
	}

	@Post('change-email')
	@HttpCode(HttpStatus.OK)
	async updateEmail(@GetUser() user: User, @Body() body: GetEmailVerificationDto) {
		await this.userService.updateEmail(user.id, body)
	}

	@Post('check-user-existence')
	@HttpCode(HttpStatus.OK)
	async checkUserExistence(@Body() body: GetUserInfoDto) {
		return await this.userService.checkUserExistence(body)
	}
}
