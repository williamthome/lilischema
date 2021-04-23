import type {
  IDoValidation,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'
import type { ISchema, SchemaType } from './protocols'

export class Schema<T, ST extends SchemaType> implements ISchema<T, ST> {
  constructor(
    readonly schemas: T,
    readonly schemaType: ST,
    readonly schemaValidation: IDoValidation,
  ) {}
  validate(payload?: ValidatePayload): ValidateResponse {
    return this.schemaValidation.validate(payload)
  }
}
