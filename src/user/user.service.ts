import { ForbiddenException, Injectable } from '@nestjs/common'
import { UserNotFound } from 'src/shared/errors/user-not-found'
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UserRepository } from './users.repository'
import * as _ from 'lodash'
import { hashPassword, verifyPassword } from '../common/utils/argon2'
import { User } from '@prisma/client'
import { SamePassword } from './errors/same-password'
import { GetUserInfoDto } from './dtos/get-user-info.dto'
import { UserDataTypes } from './constant/user-data-type.enum'

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async findOne(id: string) {
		const user = await this.userRepository.findById(id)
		if (!user) {
			throw new UserNotFound()
		}
		return user
	}

	async findOneProfile(id: string) {
		const user = await this.userRepository.findOneWithProfile(id)
		if (!user) {
			throw new UserNotFound()
		}
		return user
	}

	async update(id: string, body: UpdateUserDto) {
		return await this.userRepository.updateOne(id, body)
	}

	async updatePassword(user: User, body: UpdateUserPasswordDto) {
		let { oldPassword, newPassword } = body

		if (oldPassword === newPassword) {
			throw new SamePassword()
		}

		if (
			(!_.isNull(oldPassword) && _.isNull(user.password)) ||
			(!_.isNull(user.password) &&
				(_.isNull(oldPassword) || !(await verifyPassword(user.password, oldPassword))))
		) {
			throw new ForbiddenException()
		}

		newPassword = await hashPassword(newPassword)

		return await this.userRepository.updateOnePassword(user.id, newPassword)
	}

	async checkUserExistence(body: GetUserInfoDto) {
		const { type, value } = body
		const whereInput = type === UserDataTypes.USERNAME ? { username: value } : { email: value }
		const userExistence = !!(await this.userRepository.getCount(whereInput))
		return { userExistence }
	}
}
