import { IDoValidation } from '@/validations/protocols'
import { Schema } from './schema'

/**
 *
 * @returns required schema
 */
export function requiredSchema<T>(
  validators: T,
  schemaValidation?: IDoValidation<T>,
): Schema<T, 'required'> {
  return new Schema(validators, 'required', schemaValidation)
}

/**
 *
 * @returns optional schema
 */
export function optionalSchema<T>(
  validators: T,
  schemaValidation?: IDoValidation<T>,
): Schema<T, 'optional'> {
  return new Schema(validators, 'optional', schemaValidation)
}

/**
 *
 * @returns private schema
 */
export function privateSchema<T>(
  validators: T,
  schemaValidation?: IDoValidation<T>,
): Schema<T, 'private'> {
  return new Schema(validators, 'private', schemaValidation)
}

/**
 *
 * @returns readonly schema
 */
export function readonlySchema<T>(
  validators: T,
  schemaValidation?: IDoValidation<T>,
): Schema<T, 'readonly'> {
  return new Schema(validators, 'readonly', schemaValidation)
}
