/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Validation } from '@/validations/protocols'
import type { ISchema } from './interfaces'

type ExtractObjectSchema<T> = T extends Record<PropertyKey, unknown>
  ? {
      [P in keyof T & string]: T[P] extends ISchema<any, any>
        ? ExtractSchema<T[P]>
        : T[P] extends Validation<infer U, any>
        ? U
        : never
    }
  : never

export type ExtractSchema<T> = T extends ISchema<infer U, any>
  ? ExtractObjectSchema<U>
  : T extends () => unknown
  ? ExtractSchema<ReturnType<T>>
  : never
