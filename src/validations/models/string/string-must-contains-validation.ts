import type {
  StringArrayMatchOptions,
  ValidateOptions,
  ValidatePayload,
  ValidateResponse,
  ValidationType,
} from '@/validations/protocols'
import { AbstractValidation } from '@/validations'

export class StringMustContainsValidation<
  T extends string,
  VT extends ValidationType
> extends AbstractValidation<T, VT> {
  constructor(
    validationType: VT,
    readonly mustContains: string[],
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

    for (let words of this.mustContains) {
      if (!caseSensitive) words = words.toLocaleLowerCase()
      const textToVerify = splitInWords ? text.split(' ') : text
      if (!textToVerify.includes(words)) {
        let merged = this.mustContains.join(', ')
        if (!caseSensitive) merged = merged.toLocaleLowerCase()
        return {
          message: `${opts.propertyKey || 'Text'} must contains [${merged}]`,
          name: 'StringMustContainsValidationError',
          validated: { payload, ...opts },
        }
      }
    }
  }
}
