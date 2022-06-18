import { UpdatePostDto } from '../dto/update-post.dto'

type Category = { categoryId: string }

export interface UpdatePost extends Omit<UpdatePostDto, 'categories'> {
	categories: Category[]
	deletedAt?: Date
}
