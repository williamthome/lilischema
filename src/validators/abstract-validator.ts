import type { IValidator } from './protocols'
import type {
  IDoValidation,
  IValidation,
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export abstract class AbstractValidator<T, VT extends ValidationType>
  extends AbstractValidation<T, VT>
  implements IValidator<T, VT> {
  readonly validations: IDoValidation<T>[]

  constructor(validationType: VT, typeValidation: IValidation<T, VT>) {
    super(validationType)
    this.validations = [typeValidation]
  }

  doValidate = (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): ValidateResponse => {
    for (const validation of this.validations) {
      const error = validation.validate(payload, opts)
      if (error) return error
    }
  }
}
