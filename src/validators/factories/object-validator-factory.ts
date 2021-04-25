import { ObjectValidator } from '../models'

/**
 *
 * @returns required object validator
 */
export function requiredObject<T>(): ObjectValidator<T, 'required'> {
  return new ObjectValidator('required')
}

/**
 *
 * @returns optional object validator
 */
export function optionalObject<T>(): ObjectValidator<T, 'optional'> {
  return new ObjectValidator('optional')
}

/**
 *
 * @returns private object validator
 */
export function privateObject<T>(): ObjectValidator<T, 'private'> {
  return new ObjectValidator('private')
}

/**
 *
 * @returns readonly object validator
 */
export function readonlyObject<T>(): ObjectValidator<T, 'readonly'> {
  return new ObjectValidator('readonly')
}
