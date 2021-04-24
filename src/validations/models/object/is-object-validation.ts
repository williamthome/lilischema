import type { ValidatePayload, ValidateResponse } from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class IsObjectValidation<T = unknown> extends AbstractValidation<T> {
  validate = (toValidate?: ValidatePayload): ValidateResponse => {
    if (typeof toValidate !== 'function' && toValidate === Object(toValidate)) {
      return
    }
    const error: Error = {
      message: 'Value must be an object',
      name: 'IsObjectValidationError',
    }
    return error
  }
}
