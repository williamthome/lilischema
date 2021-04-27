import type {
  StringArrayMatchOptions,
  ValidationType,
} from '@/validations/protocols'
import { StringValidator, StringValidatorOptions } from '../models'

type StringValidatorFactoryOptions<T extends string> = StringArrayMatchOptions &
  StringValidatorOptions<T>

export function stringValidatorFactory<
  T extends string,
  VT extends ValidationType
>(validationType: VT) {
  return function (
    opts: StringValidatorFactoryOptions<T> = {},
  ): StringValidator<T, VT> {
    return new StringValidator(validationType, opts, opts)
  }
}

export const requiredString = stringValidatorFactory('required')
export const optionalString = stringValidatorFactory('optional')
export const privateString = stringValidatorFactory('private')
export const readonlyString = stringValidatorFactory('readonly')
