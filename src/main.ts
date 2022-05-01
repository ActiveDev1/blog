import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
	FastifyAdapter,
	NestFastifyApplication
} from '@nestjs/platform-fastify'
import { Logger, ValidationPipe } from '@nestjs/common'
import { config } from './config'

async function bootstrap() {
	const logger = new Logger('Bootstrap')
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({ logger: config.server.restApi.logger })
	)
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(config.server.restApi.port, config.server.restApi.host)
	logger.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
