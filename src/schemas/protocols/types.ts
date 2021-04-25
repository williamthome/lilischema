/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ISchema } from './interfaces'
import type { IValidator } from '@/validators/protocols'

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
