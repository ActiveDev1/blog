import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { join } from 'path'
import { mailerConfig } from '../../../shared/config'
import { MailProcessor } from './mail.processor'

@Module({
	imports: [
		MailerModule.forRoot({
			...mailerConfig,
			template: {
				dir: join(__dirname, 'templates'),
				adapter: new EjsAdapter(),
				options: {
					strict: false
				}
			}
		})
	],
	providers: [MailProcessor]
})
export class MailModule {}
