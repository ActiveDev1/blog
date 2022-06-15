import { Post_Comment, Profile } from '@prisma/client'
import { IUser } from './user-profile.interface'

export interface IComment extends Post_Comment {
	user: IUser
	subComments: IComment[]
}
