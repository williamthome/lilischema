import type { ValidatePayload, ValidateResponse } from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class IsStringValidation<
  T extends string = string
> extends AbstractValidation<T> {
  validate = (toValidate?: ValidatePayload): ValidateResponse => {
    if (typeof toValidate === 'string') return
    const error: Error = {
      message: 'Value must be an string',
      name: 'IsStringValidationError',
    }
    return error
  }
}
