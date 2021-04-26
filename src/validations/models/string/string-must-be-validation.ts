import type {
  StringMatchOptions,
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class StringMustBeValidation<
  T extends string,
  VT extends ValidationType
> extends AbstractValidation<T, VT> {
  constructor(
    validationType: VT,
    readonly mustBe: string[],
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

    const mustBe = caseSensitive
      ? this.mustBe
      : this.mustBe.map((v) => v.toLowerCase())

    if (mustBe.includes(text)) return

    return {
      message: `${opts.propertyKey || 'Text'} must be [${mustBe.join(', ')}]`,
      name: 'StringMustBeValidationError',
      validated: { payload, ...opts },
    }
  }
}
