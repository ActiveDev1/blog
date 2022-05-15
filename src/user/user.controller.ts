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
}
