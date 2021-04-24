import { AbstractValidator } from '../abstract-validator'
import type { SchemaType } from '@/schemas/protocols'
import { IsObjectValidation } from '@/validations/models'

export class ObjectValidator<
  T,
  ST extends SchemaType
> extends AbstractValidator<T, ST> {
  constructor(schemaType: ST) {
    super(schemaType)
    this.validations.push(new IsObjectValidation())
  }
}
