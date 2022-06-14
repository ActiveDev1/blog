function read(key: string): string {
	return process.env[key] || ''
}

function num(key: string, defaultValue: number): number {
	const value: number = parseInt(read(key))
	if (isNaN(value)) {
		return defaultValue
	}
	return value
}

function bool(key: string, defaultValue: boolean): boolean {
	const value: string = read(key).toLowerCase()
	if (value === 'false') {
		return false
	} else if (value === 'true') {
		return true
	}
	return defaultValue
}

function str(key: string, defaultValue: string): string {
	return read(key) || defaultValue
}

function array(key: string, defaultValue: string[]): string[] {
	return read(key).split(',') || defaultValue
}

export { num, bool, str, array }
