import { IUser } from 'src/shared/interfaces/user-profile.interface'
import { ProfileEntity } from '../../entities/profile.entity'

export class UserProfileResponseDto implements Partial<IUser> {
	id: string
	name: string
	username: string
	profile: ProfileEntity
}
