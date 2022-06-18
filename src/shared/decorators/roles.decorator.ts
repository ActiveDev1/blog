import { SetMetadata } from '@nestjs/common'
import { Role as RoleEnum } from '../enums/role.enum'

export const ROLE_KEY = 'role'
export const Role = (role: RoleEnum) => SetMetadata(ROLE_KEY, role)
