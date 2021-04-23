import type {
  IDoValidation,
  ValidatePayload,
  ValidateResponse,
} from './protocols'

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
