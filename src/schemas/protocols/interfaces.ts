import type { SchemaType } from './types'
import type { IDoValidation } from '@/validations/protocols'

export interface ISchemable<ST extends SchemaType> {
  readonly schemaType: ST
}

export interface ISchema<T, ST extends SchemaType>
  extends IDoValidation,
    ISchemable<ST> {
  readonly schemas: T
}
