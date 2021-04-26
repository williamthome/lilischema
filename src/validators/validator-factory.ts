import type { Validation, ValidationType } from '@/validations/protocols'
import { Validator } from './validator'

export class ValidatorFactory<
  T,
  VT extends ValidationType,
  Options,
  Arguments
> extends Validator<T, VT> {
  constructor(decoratorOpts: {
    validationType: VT
    typeValidation: Validation<T, VT>
    opts: Options
    args: Arguments
    factories: {
      [P in keyof Required<Options>]: (
        option: Required<Options>[P],
        args: Arguments,
      ) => Validation<T, VT>
    }
  }) {
    super(decoratorOpts.validationType, decoratorOpts.typeValidation)

    const { opts, args, factories } = decoratorOpts

    if (opts) {
      for (const [key, option] of Object.entries(opts)) {
        if (option === undefined || !(key in factories)) continue
        this.push(factories[key as keyof typeof factories](option, args))
      }
    }
  }
}
