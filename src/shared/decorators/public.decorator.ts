import { SetMetadata } from '@nestjs/common'

/**
 * Decorator that ignore the guards of the scope of the controller or method.
 */
export const Public = () => SetMetadata('isPublic', true)
