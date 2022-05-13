import { PostEntity } from 'src/post/entities/post.entity'

export class PostResponseDto implements Partial<PostEntity> {
	id: string
	title: string
	body: string
	description: string
	slug: string
	cover: string
	isPublished: boolean
	authorId: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date
}
