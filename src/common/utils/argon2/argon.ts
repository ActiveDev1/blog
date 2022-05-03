import { hash, verify, argon2id } from 'argon2'

const hashPassword = async (str: string) => {
	return await hash(str, {
		type: argon2id
	})
}

const verifyPassword = async (hash: string, str: string) => {
	return await verify(hash, str)
}

export { hashPassword, verifyPassword }
