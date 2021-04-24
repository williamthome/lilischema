import type { IValidator } from './protocols'
import type { SchemaType } from '@/schemas/protocols'
import type {
  IDoValidation,
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export abstract class AbstractValidator<T, ST extends SchemaType>
  extends AbstractValidation<T>
  implements IValidator<T, ST> {
  readonly validations: IDoValidation<T>[]

  constructor(readonly schemaType: ST) {
    super()
    this.validations = []
  }

  validate = (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): ValidateResponse => {
    for (const validation of this.validations) {
      const error = validation.validate(payload, opts)
      if (error) return error
    }
  }
}
