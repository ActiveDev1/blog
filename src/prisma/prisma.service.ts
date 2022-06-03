import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		super({
			log: [
				{ emit: 'stdout', level: 'query' },
				{ emit: 'stdout', level: 'info' },
				{ emit: 'stdout', level: 'warn' },
				{ emit: 'stdout', level: 'error' }
			],
			errorFormat: 'pretty'
		})
	}
	async onModuleInit() {
		await this.$connect()
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async (event) => {
			console.log(event.name)
			await app.close()
		})
	}
}
