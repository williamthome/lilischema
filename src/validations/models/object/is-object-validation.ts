import type {
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class IsObjectValidation<
  T,
  VT extends ValidationType
> extends AbstractValidation<T, VT> {
  doValidate = (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): ValidateResponse => {
    if (typeof payload !== 'function' && payload === Object(payload)) {
      return
    }
    return {
      message: `${opts.propertyKey || 'Value'} must be an object`,
      name: 'IsObjectValidationError',
      validated: { payload, ...opts },
    }
  }
}
