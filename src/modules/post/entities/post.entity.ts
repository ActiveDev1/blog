import { Post_Category, Post_Comment, Post_Like } from '@prisma/client'
import { IUser } from '../../../shared/interfaces/user-profile.interface'
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
	author: IUser
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
