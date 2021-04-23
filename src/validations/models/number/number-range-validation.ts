import type {
  IDoValidation,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'
import { IsNumberValidation } from './is-number-validation'

export class NumberRangeValidation implements IDoValidation {
  constructor(readonly range: { min?: number; max?: number }) {}

  validate(
    toValidate?: ValidatePayload,
    isNumberValidation?: IsNumberValidation,
  ): ValidateResponse {
    isNumberValidation = isNumberValidation ?? new IsNumberValidation()
    const validationError = isNumberValidation.validate(toValidate)
    if (validationError) return validationError

    const { min, max } = this.range
    const value = toValidate as number

    if (min !== undefined && max !== undefined) {
      if (value >= min && value <= max) return
      return {
        message: `Value must be between ${min} && ${max}`,
        name: 'IsNumberValidationError',
      }
    } else if (min !== undefined) {
      if (value >= min) return
      return {
        message: `Value must be at least ${min}`,
        name: 'IsNumberValidationError',
      }
    } else if (max !== undefined) {
      if (value <= max) return
      return {
        message: `Value must be a maximum of ${max}`,
        name: 'IsNumberValidationError',
      }
    }
  }
}
