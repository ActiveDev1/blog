import { User } from '@prisma/client'

export class UserResponseDto implements Partial<User> {
	id: string
	name: string
	username: string
}
