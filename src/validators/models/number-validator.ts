import type { ValidationType } from '@/validations/protocols'
import {
  IsNumberValidation,
  NumberRange,
  NumberRangeValidation,
} from '@/validations/models'
import { ValidatorFactory } from '../validator-factory'

export interface NumberValidatorOptions {
  readonly range?: NumberRange
}

export class NumberValidator<
  T extends number,
  VT extends ValidationType
> extends ValidatorFactory<T, VT, NumberValidatorOptions, undefined> {
  constructor(validationType: VT, opts: NumberValidatorOptions = {}) {
    super({
      validationType,
      typeValidation: new IsNumberValidation<T, VT>(validationType),
      opts,
      args: undefined,
      factories: {
        range: (range) => new NumberRangeValidation(validationType, range),
      },
    })
  }
}
