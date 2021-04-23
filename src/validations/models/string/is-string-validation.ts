import type {
  IDoValidation,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'

export class IsStringValidation implements IDoValidation {
  validate(toValidate?: ValidatePayload): ValidateResponse {
    if (typeof toValidate === 'string') return
    const error: Error = {
      message: 'Value must be an string',
      name: 'IsStringValidationError',
    }
    return error
  }
}
