import { AbstractValidator } from '../abstract-validator'
import type { SchemaType } from '@/schemas/protocols'
import { IsStringValidation } from '@/validations/models'

export class StringValidator<ST extends SchemaType> extends AbstractValidator<
  string,
  ST
> {
  constructor(schemaType: ST) {
    super(schemaType)
    this.validations.push(new IsStringValidation())
  }
}
