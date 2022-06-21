import { Post_Category, Post_Comment, Post_Like, User } from '@prisma/client'
import { IPost } from '../interfaces/post.interface'

export class PostEntity implements IPost {
	id: string
	title: string
	body: string
	description: string
	slug: string
	cover: string
	isPublished: boolean
	authorId: string
	author: User
	categories: Post_Category[]
	comments: Post_Comment[]
	likes: Post_Like[]
	createdAt: Date
	updatedAt: Date
	deletedAt: Date

	constructor(partial: Partial<PostEntity>) {
		Object.assign(this, partial)
	}
}
