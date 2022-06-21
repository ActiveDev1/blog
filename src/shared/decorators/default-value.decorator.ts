import { Transform } from 'class-transformer'

const defaultValueDecorator = <T>(defaultValue: T) => {
	return Transform(({ value }: any) => value || defaultValue)
}

export default defaultValueDecorator
