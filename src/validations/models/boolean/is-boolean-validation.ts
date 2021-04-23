import type {
  IDoValidation,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'

export class IsBooleanValidation implements IDoValidation {
  validate(toValidate?: ValidatePayload): ValidateResponse {
    if (typeof toValidate === 'boolean') return
    const error: Error = {
      message: 'Value must be an boolean',
      name: 'IsBooleanValidationError',
    }
    return error
  }
}
