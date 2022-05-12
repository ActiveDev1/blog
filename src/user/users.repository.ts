import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUser } from './interfaces/create-user.interface'

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create({ email, name, username }: CreateUser): Promise<User> {
		return await this.prisma.user.create({
			data: { email, name, username, profile: { create: {} } }
		})
	}

	async findById(id: string): Promise<User> {
		return await this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async findByEmail(email: string): Promise<User> {
		return await this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}
}
