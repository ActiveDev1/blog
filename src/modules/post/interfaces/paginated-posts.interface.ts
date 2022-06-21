import { IPost } from './post.interface'

export interface PaginatedPosts {
	posts: IPost[]
	pages: number
	hasNext: boolean
	hasPrev: boolean
	postsCount: number
}
