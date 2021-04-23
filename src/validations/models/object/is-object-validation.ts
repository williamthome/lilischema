import type {
  IDoValidation,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'

export class IsObjectValidation implements IDoValidation {
  validate(toValidate?: ValidatePayload): ValidateResponse {
    if (toValidate === Object(toValidate)) return
    const error: Error = {
      message: 'Value must be an object',
      name: 'IsObjectValidationError',
    }
    return error
  }
}
