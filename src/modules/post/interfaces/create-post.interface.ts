import { CreatePostDto } from '../dto/create-post.dto'

type Category = { categoryId: string }

export interface CreatePost extends Omit<CreatePostDto, 'categories'> {
	categories: Category[]
}
