import type {
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class IsBooleanValidation<
  T extends boolean,
  VT extends ValidationType
> extends AbstractValidation<T, VT> {
  doValidate = (
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
