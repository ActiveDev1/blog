import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	mixin,
	Type
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { fixLink } from '../../common/utils/helpers/functions'
import { IUser } from '../../common/interfaces/user-profile.interface'
import { Post } from '@prisma/client'
import { isEmpty } from 'lodash'

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
