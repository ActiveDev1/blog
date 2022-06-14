import { ForbiddenException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import * as _ from 'lodash'
import { UserNotFound } from 'src/shared/errors/user-not-found'
import { hashPassword, verifyPassword } from '../../shared/utils/argon2'
import { AuthService } from '../auth/auth.service'
import { GetEmailVerificationDto } from '../auth/dtos/get-email-verification.dto'
import { WrongVerificationCode } from '../auth/errors/wrong-verification-code'
import { UserDataTypes } from './constant/user-data-type.enum'
import { GetUserInfoDto } from './dtos/get-user-info.dto'
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { DuplicateEmail } from './errors/duplicate-email'
import { SamePassword } from './errors/same-password'
import { UserRepository } from './users.repository'

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly authService: AuthService
	) {}

	async findOne(id: string) {
		const user = await this.userRepository.findById(id)
		if (!user) {
			throw new UserNotFound()
		}
		return user
	}

	async findOneProfile(id: string) {
		return await this.userRepository.findOneWithProfile(id)
	}

	async findOnePosts(id: string) {
		return await this.userRepository.findOneWithProfileAndPosts(id)
	}

	async update(id: string, body: UpdateUserDto) {
		return await this.userRepository.updateOne(id, body)
	}

	async updatePassword(user: User, body: UpdateUserPasswordDto) {
		const { id, password: currentPassword } = user
		const { oldPassword, newPassword } = body

		if (oldPassword === newPassword) {
			throw new SamePassword()
		}

		if (
			(!_.isNull(oldPassword) && _.isNull(currentPassword)) ||
			(!_.isNull(currentPassword) &&
				(_.isNull(oldPassword) || !(await verifyPassword(currentPassword, oldPassword))))
		) {
			throw new ForbiddenException()
		}

		const newHashPassword = await hashPassword(newPassword)

		return await this.userRepository.updatePassword(id, newHashPassword)
	}

	async updateEmail(userId: string, body: GetEmailVerificationDto) {
		const { email, code } = body

		if (await this.authService.checkVerificationCode({ email, code })) {
			throw new WrongVerificationCode()
		}

		const user = await this.userRepository.findByEmail(email)

		if (user) {
			throw new DuplicateEmail()
		}

		return await this.userRepository.updateEmail(userId, email)
	}

	async checkUserExistence(body: GetUserInfoDto) {
		const { type, value } = body
		const whereInput = type === UserDataTypes.USERNAME ? { username: value } : { email: value }
		const userExistence = !!(await this.userRepository.getCount(whereInput))
		return { userExistence }
	}
}
