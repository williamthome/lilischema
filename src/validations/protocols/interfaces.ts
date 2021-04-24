import type { ITypeWrapper } from '@/common/protocols'
import type { ValidateFunction } from './types'

export interface IDoValidation<T> extends ITypeWrapper<T> {
  validate: ValidateFunction
}
