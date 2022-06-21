import {
	CallHandler,
	ExecutionContext,
	Injectable,
	mixin,
	NestInterceptor,
	Type
} from '@nestjs/common'
import { Post } from '@prisma/client'
import { isEmpty } from 'lodash'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { PaginatedPosts } from 'src/modules/post/interfaces/paginated-posts.interface'
import { IPost } from 'src/modules/post/interfaces/post.interface'
import { IUser } from '../../shared/interfaces/user-profile.interface'
import { fixLink } from '../../shared/utils/helpers/functions'
import { IComment } from '../interfaces/comment.interface'

type DataType = 'user' | 'users' | 'post' | 'posts' | 'public-posts' | 'comments'
const dataTypes = {
	user: fixUserLinks,
	users: fixUsersLinks,
	post: fixPostLinks,
	posts: fixPostsLinks,
	'public-posts': fixPublicPostsLinks,
	comments: fixCommentsLinks
}

export const LinkFixerInterceptor = (type: DataType): Type => {
	@Injectable()
	class LinkFixerInterceptorMixin implements NestInterceptor {
		intercept(
			_context: ExecutionContext,
			next: CallHandler
		): Observable<IUser | IUser[] | IPost | IPost[] | IComment[] | PaginatedPosts> {
			return next.handle().pipe(map((data) => dataTypes[type](data)))
		}
	}

	return mixin(LinkFixerInterceptorMixin)
}

function fixUserLinks(data: IUser) {
	data.profile.avatar = fixLink(data.profile?.avatar)

	if (!isEmpty(data.posts)) {
		data.posts.map((post) => (post.cover = fixLink(post.cover)))
	}

	return data
}

function fixUsersLinks(data: IUser[]) {
	if (!isEmpty(data)) {
		data.map((user) => {
			user.profile.avatar = fixLink(user.profile?.avatar)

			if (!isEmpty(user.posts)) {
				user.posts.map((post) => (post.cover = fixLink(post.cover)))
			}
		})
	}

	return data
}

function fixPostLinks(data: IPost) {
	data.cover = fixLink(data.cover)

	if (data.author) {
		data.author.profile.avatar = fixLink(data.author.profile.avatar)
	}

	return data
}

function fixPostsLinks(data: IPost[]) {
	if (!isEmpty(data)) {
		data.map((post) => (post.cover = fixLink(post.cover)))
	}

	return data
}

function fixPublicPostsLinks(data: PaginatedPosts) {
	if (!isEmpty(data.posts)) {
		data.posts.map((post) => fixPostLinks(post))
	}

	return data
}

function fixCommentsLinks(data: IComment[]) {
	if (!isEmpty(data)) {
		data.map((comment) => {
			comment.user.profile.avatar = fixLink(comment.user.profile.avatar)
			comment.subComments.map((comment) => {
				comment.user.profile.avatar = fixLink(comment.user.profile.avatar)
			})
		})
	}

	return data
}
