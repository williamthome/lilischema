import type { ITypeWrapper } from '@/common/protocols'
import type { ValidateFunction, ValidatePayload, ValidationType } from './types'

export interface IDoValidation<T> extends ITypeWrapper<T> {
  validate: ValidateFunction
}

export interface IValidable<VT extends ValidationType> {
  readonly validationType: VT
}

export interface ValidateOptions {
  propertyKey?: string
  propertyPath?: string[]
  isPartialValidation?: boolean
}

export interface ValidateError extends Error {
  validated: {
    payload?: ValidatePayload
  } & ValidateOptions
}
