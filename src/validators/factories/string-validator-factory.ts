import { StringValidator } from '../models'

/**
 *
 * @returns required string validator
 */
export function requiredString<T extends string>(): StringValidator<
  T,
  'required'
> {
  return new StringValidator('required')
}

/**
 *
 * @returns optional string validator
 */
export function optionalString<T extends string>(): StringValidator<
  T,
  'optional'
> {
  return new StringValidator('optional')
}

/**
 *
 * @returns private string validator
 */
export function privateString<T extends string>(): StringValidator<
  T,
  'private'
> {
  return new StringValidator('private')
}

/**
 *
 * @returns readonly string validator
 */
export function readonlyString<T extends string>(): StringValidator<
  T,
  'readonly'
> {
  return new StringValidator('readonly')
}
