import type {
  IValidation,
  ValidateFunction,
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'

export abstract class AbstractValidation<T, VT extends ValidationType>
  implements IValidation<T, VT> {
  readonly wrapping!: T

  constructor(readonly validationType: VT) {}

  abstract doValidate: ValidateFunction

  validate = async (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): Promise<ValidateResponse> => {
    const { validationType } = this
    const { propertyKey, isPartialValidation } = opts

    if (validationType === 'private') {
      return {
        message: `${propertyKey || 'Value'} is private`,
        name: 'PrivatePropertyError',
        validated: { payload, ...opts },
      }
    }

    if (isPartialValidation && validationType === 'readonly') {
      return {
        message: `${propertyKey || 'Value'} is readonly`,
        name: 'ReadonlyPropertyError',
        validated: { payload, ...opts },
      }
    }

    const isPayloadFalsy = payload === undefined || payload === null

    if (isPayloadFalsy && validationType !== 'required') return

    if (isPayloadFalsy && validationType === 'required') {
      return {
        message: `${propertyKey || 'Value'} is required`,
        name: 'RequiredPropertyError',
        validated: { payload, ...opts },
      }
    }

    const error = await this.doValidate(payload, opts)
    if (error) return error
  }
}
