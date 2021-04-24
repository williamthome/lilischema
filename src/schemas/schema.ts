import type { ISchema } from './protocols/interfaces'
import type { SchemaType } from './protocols/types'
import type {
  IDoValidation,
  ValidatePayload,
  ValidateResponse,
} from '@/validations/protocols'
import { AbstractValidation, doValidate } from '@/validations'
import { isIterable } from '@/common/helpers'

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
    const schemaTypeError = this.schemaValidation.validate(payload)
    if (schemaTypeError) return schemaTypeError

    if (!isIterable(payload)) {
      return {
        message: `Payload must be iterable
        e.g. {
          foo: 'bar'
        }`,
        name: 'InvalidPayloadError',
      }
    }

    for (const [key, toValidate] of Object.entries(payload)) {
      if (!(key in this.schemas)) {
        return {
          message: `Field '${key}' do not exists in schema`,
          name: 'InvalidSchemaError',
        }
      }

      const validation = (this.schemas as Record<PropertyKey, unknown>)[key]

      if (!doValidate(validation)) {
        return {
          message: `Field '${key}' must do validate`,
          name: 'InvalidValidationError',
        }
      }

      const error = validation.validate(toValidate)
      if (error) return error
    }
  }
}
