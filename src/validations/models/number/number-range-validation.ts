import type {
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
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
    const { min, max } = this.range
    const value = payload as number
    const { propertyKey } = opts

    if (min !== undefined && max !== undefined) {
      if (value >= min && value <= max) return
      return {
        message: `${propertyKey || 'Value'} must be between ${min} && ${max}`,
        name: 'NumberRangeValidationError',
        validated: { payload, ...opts },
      }
    } else if (min !== undefined) {
      if (value >= min) return
      return {
        message: `${propertyKey || 'Value'} must be at least ${min}`,
        name: 'MinNumberValidationError',
        validated: { payload, ...opts },
      }
    } else if (max !== undefined) {
      if (value <= max) return
      return {
        message: `${propertyKey || 'Value'} must be a maximum of ${max}`,
        name: 'MaxNumberValidationError',
        validated: { payload, ...opts },
      }
    }
  }
}
