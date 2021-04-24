import type { ISchema } from './protocols/interfaces'
import type { SchemaType } from './protocols/types'
import type {
  IDoValidation,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class Schema<T, ST extends SchemaType>
  extends AbstractValidation<T>
  implements ISchema<T, ST> {
  constructor(
    readonly schemas: T,
    readonly schemaType: ST,
    readonly schemaValidation: IDoValidation<T>,
  ) {
    super()
  }

  validate = (payload?: ValidatePayload): ValidateResponse => {
    return this.schemaValidation.validate(payload)
  }
}
