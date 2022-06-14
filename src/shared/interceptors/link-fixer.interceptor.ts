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
import { IUser } from '../../shared/interfaces/user-profile.interface'
import { fixLink } from '../../shared/utils/helpers/functions'

type DataType = 'user' | 'users' | 'post' | 'posts'
const dataTypes = {
	user: fixUserLinks,
	users: fixUsersLinks,
	post: fixPostLinks,
	posts: fixPostsLinks
}

export const LinkFixerInterceptor = (type: DataType): Type => {
	@Injectable()
	class LinkFixerInterceptorMixin implements NestInterceptor {
		intercept(
			_context: ExecutionContext,
			next: CallHandler
		): Observable<IUser | IUser[] | Post | Post[]> {
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

function fixPostLinks(data: Post) {
	data.cover = fixLink(data.cover)

	return data
}

function fixPostsLinks(data: Post[]) {
	if (!isEmpty(data)) {
		data.map((post) => (post.cover = fixLink(post.cover)))
	}

	return data
}
