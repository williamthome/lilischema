import type {
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { IsNumberValidation } from './is-number-validation'
import { AbstractValidation } from '@/validations'

export interface NumberRange {
  min?: number
  max?: number
}
export class NumberRangeValidation<
  T extends number,
  VT extends ValidationType
> extends AbstractValidation<T, VT> {
  constructor(validationType: VT, readonly range: NumberRange) {
    super(validationType)
  }

  doValidate = async (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): Promise<ValidateResponse> => {
    const typeValidation = new IsNumberValidation(this.validationType)
    const typeValidationError = await typeValidation.validate(payload, opts)
    if (typeValidationError) return typeValidationError

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
