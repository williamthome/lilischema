import type {
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class IsStringValidation<
  T extends string,
  VT extends ValidationType
> extends AbstractValidation<T, VT> {
  doValidate = async (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): Promise<ValidateResponse> => {
    if (typeof payload === 'string') return
    return {
      message: `${opts.propertyKey || 'Value'} must be an string`,
      name: 'IsStringValidationError',
      validated: { payload, ...opts },
    }
  }
}
