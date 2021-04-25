import { AbstractValidator } from '../abstract-validator'
import { IsObjectValidation } from '@/validations/models'
import type { ValidationType } from '@/validations/protocols'

export class ObjectValidator<
  T,
  VT extends ValidationType
> extends AbstractValidator<T, VT> {
  constructor(validationType: VT) {
    super(validationType, new IsObjectValidation(validationType))
  }
}
