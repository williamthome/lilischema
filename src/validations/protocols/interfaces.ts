import type { ITypeWrapper } from '@/common/protocols'
import type { ValidateFunction, ValidatePayload, ValidationType } from './types'

export interface ValidateOptions {
  propertyKey?: string
  propertyPath?: string[]
  isPartialValidation?: boolean
}

export interface IDoValidation<T> extends ITypeWrapper<T> {
  validate: ValidateFunction
}

export interface IValidable<VT extends ValidationType> {
  readonly validationType: VT
}

export interface IValidation<T, VT extends ValidationType>
  extends IDoValidation<T>,
    IValidable<VT> {
  doValidate: ValidateFunction
}

export interface ValidationError extends Error {
  validated: {
    payload?: ValidatePayload
  } & ValidateOptions
}
