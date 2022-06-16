import { User } from '@prisma/client'

export interface CreateComment {
	postId: string
	user: User
	parentId: string
	content: string
}
