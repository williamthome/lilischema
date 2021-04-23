/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ISchema } from './interfaces'
import type { IValidator } from '@/validators/protocols'

export type RequiredSchema = 'required'
export type OptionalSchema = 'optional'
export type PrivateSchema = 'private'
export type ReadonlySchema = 'readonly'

export type SchemaType =
  | RequiredSchema
  | OptionalSchema
  | PrivateSchema
  | ReadonlySchema

type ExtractObjectSchema<T extends Record<PropertyKey, unknown>> = {
  [P in keyof T & string]: T[P] extends ISchema<any, any>
    ? ExtractSchema<T[P]>
    : T[P] extends IValidator<infer U, any>
    ? U
    : never
}

export type ExtractSchema<T> = T extends ISchema<infer U, any>
  ? U extends Record<PropertyKey, unknown>
    ? ExtractObjectSchema<U>
    : never
  : never
