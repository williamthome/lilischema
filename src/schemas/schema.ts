import type { ISchema } from './protocols/interfaces'
import type { SchemaType } from './protocols/types'
import type {
  IDoValidation,
  ValidateOptions,
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

  validate = (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): ValidateResponse => {
    const schemaTypeError = this.schemaValidation.validate(payload, opts)
    if (schemaTypeError) return schemaTypeError

    const { isPartialValidation, propertyKey, propertyPath } = opts

    if (!isIterable(payload)) {
      return {
        message: `Payload must be iterable
        e.g. {
          foo: 'bar'
        }`,
        name: 'InvalidPayloadError',
        validated: { payload, ...opts },
      }
    }

    const payloadPath = propertyPath ?? []

    for (const [key, toValidate] of Object.entries(payload)) {
      if (!(key in this.schemas)) {
        return {
          message: `Field '${key}' do not exists in schema`,
          name: 'InvalidSchemaError',
          validated: { payload, ...opts },
        }
      }

      const validation = (this.schemas as Record<PropertyKey, unknown>)[key]

      if (!doValidate(validation)) {
        return {
          message: `Field '${key}' must do validate`,
          name: 'InvalidValidationError',
          validated: { payload, ...opts },
        }
      }

      const validationPath = propertyKey
        ? [...payloadPath, propertyKey]
        : payloadPath

      const error = validation.validate(toValidate, {
        propertyKey: key,
        propertyPath: validationPath,
        isPartialValidation,
      })
      if (error) return error
    }
  }
}
