import { AbstractValidator } from '../abstract-validator'
import {
  IsNumberValidation,
  NumberRange,
  NumberRangeValidation,
} from '@/validations/models'
import type { ValidationType } from '@/validations/protocols'

export class NumberValidator<
  T extends number,
  VT extends ValidationType
> extends AbstractValidator<T, VT> {
  constructor(validationType: VT) {
    super(validationType, new IsNumberValidation(validationType))
  }

  range(range: NumberRange): this {
    return this.push(new NumberRangeValidation(this.validationType, range))
  }
}
