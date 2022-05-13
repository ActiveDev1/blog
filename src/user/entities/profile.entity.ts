import { Profile, User } from '@prisma/client'

export class ProfileEntity implements Profile {
	id: string
	bio: string
	avatar: string
	cover: string
	user: User
	userId: string

	constructor(partial: Partial<ProfileEntity>) {
		Object.assign(this, partial)
	}
}
