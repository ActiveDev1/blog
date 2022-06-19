import { ValidationError, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { contentParser } from 'fastify-multer/lib'
import { AppModule } from './app.module'
import { config } from './shared/config'
import { ValidationException, ValidationFilter } from './shared/filters/validation.filter'
import { TransformInterceptor } from './shared/interceptors/response-transform.interceptor'

declare const module: any

async function bootstrap() {
	const { enabled, prettyPrint } = config.logger.server
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			logger: enabled && prettyPrint ? { prettyPrint: { colorize: true } } : enabled ? true : false
		})
	)

	app.register(contentParser)
	app.setGlobalPrefix('api')
	app.useGlobalInterceptors(new TransformInterceptor())
	app.useGlobalFilters(new ValidationFilter())
	app.useGlobalPipes(
		new ValidationPipe({
			skipMissingProperties: false,
			exceptionFactory: (errors: ValidationError[]) => {
				const errMsg = {}
				errors.forEach((err) => {
					errMsg[err.property] = [...Object.values(err.constraints)]
				})
				return new ValidationException(errMsg)
			}
		})
	)

	const configDocument = new DocumentBuilder()
		.setTitle('Blog Service')
		.setDescription('The Blog APIs document')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, configDocument)
	SwaggerModule.setup('swagger', app, document)

	if (module.hot) {
		module.hot.accept()
		module.hot.dispose(() => app.close())
	}

	await app.listen(config.server.restApi.port, config.server.restApi.host)
}

bootstrap()
