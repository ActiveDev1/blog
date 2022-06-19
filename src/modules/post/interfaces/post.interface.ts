import { Post, Post_Category, Post_Comment, Post_Like, User } from '@prisma/client'

export interface IPost extends Post {
	author: User
	categories: Post_Category[]
	comments: Post_Comment[]
	likes: Post_Like[]
}
