import { Profile, Role, User } from '@prisma/client'

export class UserEntity implements User {
	id: string
	name: string
	email: string
	username: string
	password: string
	role: Role
	profile: Profile
	createdAt: Date
	updatedAt: Date
	deletedAt: Date

	constructor(partial: Partial<UserEntity>) {
		Object.assign(this, partial)
	}
}
