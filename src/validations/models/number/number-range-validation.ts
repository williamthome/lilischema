import type {
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { IsNumberValidation } from './is-number-validation'
import { AbstractValidation } from '@/validations'

export class NumberRangeValidation<
  T extends number,
  VT extends ValidationType
> extends AbstractValidation<T, VT> {
  constructor(
    validationType: VT,
    readonly range: { min?: number; max?: number },
  ) {
    super(validationType)
  }

  doValidate = (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): ValidateResponse => {
    const validationError = new IsNumberValidation(
      this.validationType,
    ).validate(payload, opts)
    if (validationError) return validationError

    const { min, max } = this.range
    const number = payload as number
    const { propertyKey } = opts

    if (min !== undefined && max !== undefined) {
      if (number >= min && number <= max) return
      return {
        message: `${propertyKey || 'Value'} must be between ${min} && ${max}`,
        name: 'NumberRangeValidationError',
        validated: { payload, ...opts },
      }
    } else if (min !== undefined) {
      if (number >= min) return
      return {
        message: `${propertyKey || 'Value'} must be at least ${min}`,
        name: 'MinNumberValidationError',
        validated: { payload, ...opts },
      }
    } else if (max !== undefined) {
      if (number <= max) return
      return {
        message: `${propertyKey || 'Value'} must be a maximum of ${max}`,
        name: 'MaxNumberValidationError',
        validated: { payload, ...opts },
      }
    }
  }
}
