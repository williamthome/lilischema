import type { ValidatePayload, ValidateResponse } from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class IsNumberValidation<
  T extends number = number
> extends AbstractValidation<T> {
  validate = (toValidate?: ValidatePayload): ValidateResponse => {
    if (typeof toValidate === 'number') return
    const error: Error = {
      message: 'Value must be an number',
      name: 'IsNumberValidationError',
    }
    return error
  }
}
