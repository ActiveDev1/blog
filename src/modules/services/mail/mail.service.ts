import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendUserConfirmation(email: string, code: number) {
		await this.mailerService.sendMail({
			to: email,
			subject: 'Welcome to my App! Confirm your Email',
			template: 'signup-confirmation',
			context: {
				code
			}
		})
	}
}
