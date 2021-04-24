import type {
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class IsStringValidation<
  T extends string = string
> extends AbstractValidation<T> {
  validate = (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): ValidateResponse => {
    if (typeof payload === 'string') return
    return {
      message: `${opts.propertyKey || 'Value'} must be an string`,
      name: 'IsStringValidationError',
      validated: { payload, ...opts },
    }
  }
}
