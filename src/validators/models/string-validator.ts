import type {
  StringArrayMatchOptions,
  ValidationType,
} from '@/validations/protocols'
import {
  IsStringValidation,
  StringMustBeValidation,
  StringMustContainsValidation,
  StringMustNotBeValidation,
  StringMustNotContainsValidation,
} from '@/validations/models'
import { ValidatorFactory } from '../validator-factory'

export interface StringValidatorOptions<T extends string> {
  readonly mustBe?: T[]
  readonly mustNotBe?: T[]
  readonly mustContains?: T[]
  readonly mustNotContains?: T[]
}

export class StringValidator<
  T extends string,
  VT extends ValidationType
> extends ValidatorFactory<
  T,
  VT,
  StringValidatorOptions<T>,
  StringArrayMatchOptions
> {
  constructor(
    validationType: VT,
    opts: StringValidatorOptions<T> = {},
    args: StringArrayMatchOptions = {},
  ) {
    super({
      validationType,
      typeValidation: new IsStringValidation<T, VT>(validationType),
      opts,
      args,
      factories: {
        mustBe: (mustBe, opts) =>
          new StringMustBeValidation(validationType, mustBe, opts),
        mustNotBe: (mustNotBe, opts) =>
          new StringMustNotBeValidation(validationType, mustNotBe, opts),
        mustContains: (mustContains, opts) =>
          new StringMustContainsValidation(validationType, mustContains, opts),
        mustNotContains: (mustNotContains, opts) =>
          new StringMustNotContainsValidation(
            validationType,
            mustNotContains,
            opts,
          ),
      },
    })
  }
}
