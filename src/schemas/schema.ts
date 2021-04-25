import type { ISchema } from './protocols/interfaces'
import type {
  IDoValidation,
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation, isDoValidation } from '@/validations'
import { isIterable } from '@/common/helpers'
import { IsObjectValidation } from '@/validations/models'

export class Schema<T, VT extends ValidationType>
  extends AbstractValidation<T, VT>
  implements ISchema<T, VT> {
  readonly schemaValidation: IDoValidation<T>

  constructor(
    readonly schemas: T,
    validationType: VT,
    schemaValidation?: IDoValidation<T>,
  ) {
    super(validationType)

    this.schemaValidation =
      schemaValidation ?? new IsObjectValidation(validationType)
  }

  doValidate = (
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

    for (const key of Object.keys(payload)) {
      if (!(key in this.schemas)) {
        return {
          message: `Field '${key}' do not exists in schema`,
          name: 'InvalidSchemaError',
          validated: { payload, ...opts },
        }
      }
    }

    const payloadPath = propertyPath ?? []

    for (const [key, validation] of Object.entries(this.schemas)) {
      if (!isDoValidation(validation)) {
        return {
          message: `Field '${key}' must do validate`,
          name: 'InvalidValidationError',
          validated: { payload, ...opts },
        }
      }

      if (isPartialValidation && !(key in payload)) continue

      const toValidate = payload[key]

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
