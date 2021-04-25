import type { ValidateOptions, ValidationError } from './interfaces'

export type ValidateResponse = void | ValidationError

export type ValidatePayload = unknown | undefined

export type ValidateFunction = (
  payload?: ValidatePayload,
  opts?: ValidateOptions,
) => Promise<ValidateResponse>

export type RequiredValidation = 'required'
export type OptionalValidation = 'optional'
export type PrivateValidation = 'private'
export type ReadonlyValidation = 'readonly'

export type ValidationType =
  | RequiredValidation
  | OptionalValidation
  | PrivateValidation
  | ReadonlyValidation
