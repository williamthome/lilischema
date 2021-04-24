import type {
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class IsBooleanValidation<
  T extends boolean = boolean
> extends AbstractValidation<T> {
  validate = (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): ValidateResponse => {
    if (typeof payload === 'boolean') return
    return {
      message: `${opts.propertyKey || 'Value'} must be an boolean`,
      name: 'IsBooleanValidationError',
      validated: { payload, ...opts },
    }
  }
}
