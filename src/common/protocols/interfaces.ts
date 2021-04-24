import type { ValidateOptions, ValidatePayload } from '@/validations/protocols'

export interface ITypeWrapper<T> {
  readonly wrapping: T
}

export interface ValidationError extends Error {
  validated: {
    payload?: ValidatePayload
  } & ValidateOptions
}
