import { BooleanValidator } from '../models'

/**
 *
 * @returns required boolean validator
 */
export function requiredBoolean<T extends boolean>(): BooleanValidator<
  T,
  'required'
> {
  return new BooleanValidator('required')
}

/**
 *
 * @returns optional boolean validator
 */
export function optionalBoolean<T extends boolean>(): BooleanValidator<
  T,
  'optional'
> {
  return new BooleanValidator('optional')
}

/**
 *
 * @returns private boolean validator
 */
export function privateBoolean<T extends boolean>(): BooleanValidator<
  T,
  'private'
> {
  return new BooleanValidator('private')
}

/**
 *
 * @returns readonly boolean validator
 */
export function readonlyBoolean<T extends boolean>(): BooleanValidator<
  T,
  'readonly'
> {
  return new BooleanValidator('readonly')
}
