import type { SchemaType } from '@/schemas/protocols'
import { IsStringValidation } from '@/validations/models'
import type {
  IDoValidation,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'
import type { IValidator } from './protocols'

export class Validator<T, ST extends SchemaType> implements IValidator<T, ST> {
  readonly objectType!: T
  readonly validations: IDoValidation[]
  constructor(readonly schemaType: ST) {
    this.validations = []
  }
  validate(payload?: ValidatePayload): ValidateResponse {
    for (const validation of this.validations) {
      const error = validation.validate(payload)
      if (error) return error
    }
  }
}

export class StringValidator<ST extends SchemaType> extends Validator<
  string,
  ST
> {
  constructor(schemaType: ST) {
    super(schemaType)
    this.validations.push(new IsStringValidation())
  }
}
