import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { join } from 'path'

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: 'smtp.mailtrap.io',
				port: 2525,
				secure: false,
				auth: {
					user: '043b6ba33c1069',
					pass: 'fabf1b61c51212'
				}
			},
			defaults: {
				from: '"No Reply" <noreply@example.com>'
			},
			template: {
				dir: join(__dirname, 'templates'),
				adapter: new EjsAdapter(),
				options: {
					strict: false
				}
			}
		})
	],
	providers: [MailService],
	exports: [MailService]
})
export class MailModule {}
