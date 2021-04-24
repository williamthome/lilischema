import type { ITypeWrapper } from '@/common/protocols'
import type { ValidateFunction } from './types'

export interface ValidateOptions {
  propertyKey?: string
  propertyPath?: string[]
  isPartialValidation?: boolean
}

export interface IDoValidation<T> extends ITypeWrapper<T> {
  validate: ValidateFunction
}
