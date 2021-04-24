import { AbstractValidator } from '../abstract-validator'
import type { SchemaType } from '@/schemas/protocols'
import { IsNumberValidation } from '@/validations/models'

export class NumberValidator<ST extends SchemaType> extends AbstractValidator<
  number,
  ST
> {
  constructor(schemaType: ST) {
    super(schemaType)
    this.validations.push(new IsNumberValidation())
  }
}
