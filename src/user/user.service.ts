import { Injectable } from '@nestjs/common'
import { UserNotFound } from 'src/shared/errors/user-not-found'
import { UserRepository } from './users.repository'

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
}
