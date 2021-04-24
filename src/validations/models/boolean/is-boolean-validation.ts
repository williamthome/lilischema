import type { ValidatePayload, ValidateResponse } from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class IsBooleanValidation<
  T extends boolean = boolean
> extends AbstractValidation<T> {
  validate = (toValidate?: ValidatePayload): ValidateResponse => {
    if (typeof toValidate === 'boolean') return
    const error: Error = {
      message: 'Value must be an boolean',
      name: 'IsBooleanValidationError',
    }
    return error
  }
}
