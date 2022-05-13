import { Post, User } from '@prisma/client'

export class PostEntity implements Post {
	id: string
	title: string
	body: string
	description: string
	slug: string
	cover: string
	isPublished: boolean
	user: User
	authorId: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date

	constructor(partial: Partial<PostEntity>) {
		Object.assign(this, partial)
	}
}
