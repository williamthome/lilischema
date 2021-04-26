import type {
  StringArrayMatchOptions,
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class StringMustNotContainsValidation<
  T extends string,
  VT extends ValidationType
> extends AbstractValidation<T, VT> {
  constructor(
    validationType: VT,
    readonly mustNotContains: string[],
    readonly opts: StringArrayMatchOptions = {},
  ) {
    super(validationType)
  }

  doValidate = async (
    payload?: ValidatePayload,
    opts: ValidateOptions = {},
  ): Promise<ValidateResponse> => {
    const { caseSensitive, splitInWords } = this.opts
    let text = payload as string
    if (!caseSensitive) text = text.toLocaleLowerCase()

    for (let words of this.mustNotContains) {
      if (!caseSensitive) words = words.toLocaleLowerCase()
      const textToVerify = splitInWords ? text.split(' ') : text
      if (textToVerify.includes(words)) {
        let merged = this.mustNotContains.join(', ')
        if (!caseSensitive) merged = merged.toLocaleLowerCase()
        return {
          message: `${
            opts.propertyKey || 'Text'
          } must not contains [${merged}]`,
          name: 'StringMustNotContainsValidationError',
          validated: { payload, ...opts },
        }
      }
    }
  }
}
