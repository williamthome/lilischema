import { AbstractValidator } from '../abstract-validator'
import { IsStringValidation } from '@/validations/models'
import type { ValidationType } from '@/validations/protocols'

export class StringValidator<
  T extends string,
  VT extends ValidationType
> extends AbstractValidator<T, VT> {
  constructor(validationType: VT) {
    super(validationType, new IsStringValidation(validationType))
  }
}
