import type {
  IDoValidation,
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation, isDoValidation, isValidable } from '@/validations'
import { isIterable } from '@/common/helpers'
import { IsObjectValidation } from '@/validations/models'

export class Schema<T, VT extends ValidationType> extends AbstractValidation<
  T,
  VT
> {
  private readonly schemaValidation: IDoValidation<T>

  constructor(
    private readonly schemas: T,
    validationType: VT,
    schemaValidation?: IDoValidation<T>,
  ) {
    super(validationType)

    this.schemaValidation =
      schemaValidation ?? new IsObjectValidation(validationType)
  }

  protected doValidate = async (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): Promise<ValidateResponse> => {
    const schemaTypeError = await this.schemaValidation.validate(payload, opts)
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

      const isPrivateField =
        isValidable(validation) && validation.validationType === 'private'

      if (!(key in payload) && (isPartialValidation || isPrivateField)) continue

      const toValidate = payload[key]

      const validationPath = propertyKey
        ? [...payloadPath, propertyKey]
        : payloadPath

      const error = await validation.validate(toValidate, {
        propertyKey: key,
        propertyPath: validationPath,
        isPartialValidation,
      })
      if (error) return error
    }
  }
}
