import type {
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class IsNumberValidation<
  T extends number,
  VT extends ValidationType
> extends AbstractValidation<T, VT> {
  doValidate = async (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): Promise<ValidateResponse> => {
    if (typeof payload === 'number') return
    return {
      message: `${opts.propertyKey || 'Value'} must be an number`,
      name: 'IsNumberValidationError',
      validated: { payload, ...opts },
    }
  }
}
