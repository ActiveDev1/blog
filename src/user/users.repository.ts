import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { ICreateUser } from './interfaces/create-user.interface'

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async upsert({ email, name, username }: ICreateUser): Promise<User> {
		return await this.prisma.user.upsert({
			where: {
				email
			},
			update: {},
			create: { email, name, username }
		})
	}

	async findById(id: string): Promise<User> {
		return await this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}
}
