/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { ValidationType } from '@/validations/protocols'
import { NumberValidator, NumberValidatorOptions } from '../models'

export function numberValidatorFactory<
  T extends number,
  VT extends ValidationType
>(validationType: VT) {
  return function (opts: NumberValidatorOptions = {}): NumberValidator<T, VT> {
    return new NumberValidator(validationType, opts)
  }
}

export const requiredNumber = numberValidatorFactory('required')
export const optionalNumber = numberValidatorFactory('optional')
export const privateNumber = numberValidatorFactory('private')
export const readonlyNumber = numberValidatorFactory('readonly')
