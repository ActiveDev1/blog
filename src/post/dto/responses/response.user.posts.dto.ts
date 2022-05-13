import { Post, Profile } from '@prisma/client'
import { PostEntity } from 'src/post/entities/post.entity'

class PostsData implements Partial<Post> {
	id: string
	title: string
	description: string | null
	slug: string
	cover: string | null
	createdAt: Date
}

class ProfileData implements Partial<Profile> {
	id: string
	bio: string | null
	avatar: string | null
	cover: string | null
}

export class UserPostsResponseDto implements Partial<PostEntity> {
	id: string
	name: string
	username: string
	posts: PostsData[]
	profile: ProfileData
}
