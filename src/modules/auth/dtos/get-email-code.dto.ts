import { EmailVerification } from '../interfaces/email-verification.interface'

export class GetEmailCodeDto implements EmailVerification {
	email: string
	code: string
}
