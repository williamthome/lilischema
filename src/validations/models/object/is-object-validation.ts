import type {
  IDoValidation,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'

export class IsObjectValidation implements IDoValidation {
  validate(toValidate?: ValidatePayload): ValidateResponse {
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
