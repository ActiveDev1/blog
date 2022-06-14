import { Post, Profile, User } from '@prisma/client'

export interface IUser extends User {
	profile: Profile
	posts: Post[]
}
