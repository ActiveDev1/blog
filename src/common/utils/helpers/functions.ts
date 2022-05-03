import * as _ from 'lodash'

function generateSignupCode(): number {
	return generateRandomNumber()
}

function generateUsernameFromEmail(email: string): string {
	return email.split('@')[0]
}

function generateRandomUsername(): string {
	return 'user' + generateRandomNumber()
}

function generateRandomNumber(): number {
	return _.random(100000, 999999)
}

export { generateSignupCode, generateUsernameFromEmail, generateRandomUsername }
