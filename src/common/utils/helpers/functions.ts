import * as _ from 'lodash'

function generateSignupCode(): number {
	return generateRandomNumber()
}

function generateUsernameFromEmail(email: string): string {
	return email.split('@')[0]
}

function generateRandomName(): string {
	return 'user' + generateRandomNumber()
}

function generateRandomNumber(): number {
	return _.random(100000, 999999)
}

function generateRandomString(): string {
	return Math.random().toString(36).slice(2)
}

function slugify(string: string): string {
	return string
		.replace(/^\s+|\s+$/g, '')
		.toLocaleLowerCase()
		.replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}

export {
	generateSignupCode,
	generateUsernameFromEmail,
	generateRandomName,
	generateRandomString,
	slugify
}
