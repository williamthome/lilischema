import { NumberValidator } from '../models'

/**
 *
 * @returns required number validator
 */
export function requiredNumber<T extends number>(): NumberValidator<
  T,
  'required'
> {
  return new NumberValidator('required')
}

/**
 *
 * @returns optional number validator
 */
export function optionalNumber<T extends number>(): NumberValidator<
  T,
  'optional'
> {
  return new NumberValidator('optional')
}

/**
 *
 * @returns private number validator
 */
export function privateNumber<T extends number>(): NumberValidator<
  T,
  'private'
> {
  return new NumberValidator('private')
}

/**
 *
 * @returns readonly number validator
 */
export function readonlyNumber<T extends number>(): NumberValidator<
  T,
  'readonly'
> {
  return new NumberValidator('readonly')
}
