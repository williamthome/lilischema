import type {
  IDoValidation,
  Validation,
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class Validator<T, VT extends ValidationType> extends AbstractValidation<
  T,
  VT
> {
  protected readonly validations: IDoValidation<T>[]

  constructor(validationType: VT, typeValidation: Validation<T, VT>) {
    super(validationType)
    this.validations = [typeValidation]
  }

  push(...validator: IDoValidation<T>[]): this {
    this.validations.push(...validator)
    return this
  }

  protected doValidate = async (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): Promise<ValidateResponse> => {
    for (const validation of this.validations) {
      const error = await validation.validate(payload, opts)
      if (error) return error
    }
  }
}
