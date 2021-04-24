import type {
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class IsNumberValidation<
  T extends number = number
> extends AbstractValidation<T> {
  validate = (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): ValidateResponse => {
    if (typeof payload === 'number') return
    return {
      message: `${opts.propertyKey || 'Value'} must be an number`,
      name: 'IsNumberValidationError',
      validated: { payload, ...opts },
    }
  }
}
