import { AbstractValidator } from '../abstract-validator'
import { IsBooleanValidation } from '@/validations/models'
import type { ValidationType } from '@/validations/protocols'

export class BooleanValidator<
  T extends boolean,
  VT extends ValidationType
> extends AbstractValidator<T, VT> {
  constructor(validationType: VT) {
    super(validationType, new IsBooleanValidation(validationType))
  }
}
