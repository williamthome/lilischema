import type { ValidationError } from '@/common/protocols'
import type { ValidateOptions } from './interfaces'

export type ValidateResponse = void | ValidationError

export type ValidatePayload = unknown | undefined

export type ValidateFunction = (
  payload?: ValidatePayload,
  opts?: ValidateOptions,
) => ValidateResponse
