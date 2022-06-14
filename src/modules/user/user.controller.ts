import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { GetEmailVerificationDto } from '../../modules/auth/dtos/get-email-verification.dto'
import { GetUser } from '../../shared/decorators/get-user.decorator'
import { Public } from '../../shared/decorators/public.decorator'
import { GetIdParam } from '../../shared/dtos/get-id-param.dto'
import { AuthGuard } from '../../shared/guards/auth.guard'
import { LinkFixerInterceptor } from '../../shared/interceptors/link-fixer.interceptor'
import { GetUserInfoDto } from './dtos/get-user-info.dto'
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UserService } from './user.service'

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
	@UseInterceptors(LinkFixerInterceptor('user'))
	async findOneProfile(@Param() param: GetIdParam) {
		return await this.userService.findOneProfile(param.id)
	}

	@Get('posts')
	@UseInterceptors(LinkFixerInterceptor('user'))
	async findOnePosts(@GetUser() user: User) {
		return await this.userService.findOnePosts(user.id)
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
