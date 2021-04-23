import type {
  IDoValidation,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'

export class IsNumberValidation implements IDoValidation {
  validate(toValidate?: ValidatePayload): ValidateResponse {
    if (typeof toValidate === 'number') return
    const error: Error = {
      message: 'Value must be an number',
      name: 'IsNumberValidationError',
    }
    return error
  }
}
