import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UnauthorizedException,
	UseGuards
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiExtraModels,
	ApiHeader,
	ApiNoContentResponse,
	ApiNotAcceptableResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
	ApiUnprocessableEntityResponse
} from '@nestjs/swagger'
import { User } from '@prisma/client'
import { GetUser } from '../../shared/decorators/get-user.decorator'
import { Role } from '../../shared/decorators/roles.decorator'
import { Role as Roles } from '../../shared/enums/role.enum'
import { AuthGuard } from '../../shared/guards/auth.guard'
import { RolesGuard } from '../../shared/guards/roles.guard'
import { DefaultResponse } from '../../shared/interceptors/response-transform.interceptor'
import { AuthService } from './auth.service'
import { CreateAdminDto } from './dtos/create-admin.dto'
import { GetEmailCodeDto } from './dtos/get-email-code.dto'
import { GetEmailPassDto } from './dtos/get-email-pass.dto'
import { GetEmailVerificationDto } from './dtos/get-email-verification.dto'
import { GetEmailDto } from './dtos/get-email.dto'
import { GetUsernameDto } from './dtos/get-username.dto'
import { Tokens } from './dtos/tokens.dto'
import { UserExistence } from './dtos/user-existence.dto'
import { DuplicateUser } from './errors/duplicate-user'

@Controller('auth')
@ApiTags('Auth')
@ApiException(() => UnauthorizedException, { description: 'User is not authorized' })
@ApiExtraModels(DefaultResponse)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup/admin')
	@UseGuards(AuthGuard(), RolesGuard)
	@Role(Roles.ADMIN)
	@ApiBearerAuth('access-token')
	@ApiCreatedResponse({
		description: 'Admin created'
	})
	@ApiNotAcceptableResponse({
		description: 'Admin exists'
	})
	@ApiException(() => DuplicateUser, { description: 'Admin exists' })
	async signupAdmin(@Body() body: CreateAdminDto): Promise<Tokens> {
		return await this.authService.signupAdmin(body)
	}

	@Post('code')
	@ApiNoContentResponse({
		description: 'A verification code sent to target email'
	})
	@HttpCode(HttpStatus.NO_CONTENT)
	async sendVerificationCode(@Body() body: GetEmailDto): Promise<void> {
		await this.authService.sendVerificationCode(body)
	}

	@Post('signup')
	@ApiCreatedResponse({
		description: 'User created',
		type: Tokens
	})
	@ApiUnprocessableEntityResponse({
		description: 'Wrong code received'
	})
	async signup(@Body() body: GetEmailVerificationDto): Promise<Tokens> {
		return await this.authService.signup(body)
	}

	@Post('login/password')
	@ApiOkResponse({
		description: 'Successful login',
		type: Tokens
	})
	@ApiNotAcceptableResponse({
		description: 'The user has not yet registered the password'
	})
	@ApiUnauthorizedResponse({
		description: 'Email and or password is incorrect'
	})
	@HttpCode(HttpStatus.OK)
	async loginWithPassword(@Body() body: GetEmailPassDto): Promise<Tokens> {
		return await this.authService.loginWithPassword(body)
	}

	@Post('login/code')
	@ApiOkResponse({
		description: 'Successful login',
		type: Tokens
	})
	@ApiNotFoundResponse({
		description: 'User not found'
	})
	@ApiUnprocessableEntityResponse({
		description: 'Wrong code received'
	})
	@HttpCode(HttpStatus.OK)
	async loginWithCode(@Body() body: GetEmailCodeDto): Promise<Tokens> {
		return await this.authService.loginWithCode(body)
	}

	@Post('refresh')
	@UseGuards(AuthGuard('refresh'))
	@ApiHeader({
		name: 'Authorization',
		description: 'Must be refresh token',
		required: true
	})
	@ApiCreatedResponse({
		description: 'Access & Refresh tokens',
		type: Tokens
	})
	async refreshToken(@GetUser() user: User): Promise<Tokens> {
		return await this.authService.verifyRefreshToken(user.id)
	}

	@Post('user-existence')
	@ApiOkResponse({
		type: UserExistence
	})
	@HttpCode(HttpStatus.OK)
	async userExistence(@Body() body: GetUsernameDto) {
		return await this.authService.checkUserExistence(body)
	}
}
