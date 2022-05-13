import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '../shared/guards/auth.guard'
import { GetIdParam } from '../shared/dtos/get-id-param.dto'
import { Public } from 'src/shared/decorators/public.decorator'

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
}
