import type {
  IDoValidation,
  IValidable,
  ValidateOptions,
  ValidateError,
} from './interfaces'

export type ValidateResponse = void | ValidateError

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

export type Validation<T, VT extends ValidationType> = IDoValidation<T> &
  IValidable<VT>
