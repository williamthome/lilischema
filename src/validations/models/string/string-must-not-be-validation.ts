import type {
  StringMatchOptions,
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class StringMustNotBeValidation<
  T extends string,
  VT extends ValidationType
> extends AbstractValidation<T, VT> {
  constructor(
    validationType: VT,
    readonly mustNotBe: string[],
    readonly opts: StringMatchOptions = {},
  ) {
    super(validationType)
  }

  doValidate = async (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): Promise<ValidateResponse> => {
    const { caseSensitive } = this.opts

    let text = payload as string
    if (!caseSensitive) text = text.toLocaleLowerCase()

    const mustNotBe = caseSensitive
      ? this.mustNotBe
      : this.mustNotBe.map((v) => v.toLowerCase())

    if (!mustNotBe.includes(text)) return

    return {
      message: `${opts.propertyKey || 'Text'} must not be [${mustNotBe.join(
        ', ',
      )}]`,
      name: 'StringMustNotBeValidationError',
      validated: { payload, ...opts },
    }
  }
}
