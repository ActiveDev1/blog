import { Post, Post_Category, Post_Comment, Post_Like } from '@prisma/client'
import { IUser } from '../../../shared/interfaces/user-profile.interface'

export interface IPost extends Post {
	author: IUser
	categories: Post_Category[]
	comments: Post_Comment[]
	likes: Post_Like[]
}
