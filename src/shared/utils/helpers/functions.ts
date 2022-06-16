import * as _ from 'lodash'
import { config } from '../../config'

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

function emailMask(email: string): string {
	const maskedEmail = email.replace(/([^@\.])/g, '*').split('')
	let previous = ''
	for (let i = 0; i < maskedEmail.length; i++) {
		if (i <= 1 || previous == '.' || previous == '@') {
			maskedEmail[i] = email[i]
		}
		previous = email[i]
	}
	return maskedEmail.join('')
}

function fixLink(link: string): string {
	return link && config.settings.publicDir + link
}

function getMentionedUsernames(text: string) {
	return [...text.matchAll(/@(\w*)/g)].map((matchArray) => matchArray[1])
}

function truncateString(text: string, num: number = 30) {
	return text.length <= num ? text : text.slice(0, num) + '...'
}

export {
	generateSignupCode,
	generateUsernameFromEmail,
	generateRandomName,
	generateRandomString,
	slugify,
	emailMask,
	fixLink,
	getMentionedUsernames,
	truncateString
}
