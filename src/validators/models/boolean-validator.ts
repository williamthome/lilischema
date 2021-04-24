import { AbstractValidator } from '../abstract-validator'
import type { SchemaType } from '@/schemas/protocols'
import { IsBooleanValidation } from '@/validations/models'

export class BooleanValidator<ST extends SchemaType> extends AbstractValidator<
  boolean,
  ST
> {
  constructor(schemaType: ST) {
    super(schemaType)
    this.validations.push(new IsBooleanValidation())
  }
}
