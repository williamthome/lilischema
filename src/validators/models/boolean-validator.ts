import type { ValidationType } from '@/validations/protocols'
import { IsBooleanValidation } from '@/validations/models'
import { ValidatorFactory } from '../validator-factory'

export class BooleanValidator<
  T extends boolean,
  VT extends ValidationType
> extends ValidatorFactory<T, VT, undefined, undefined> {
  constructor(validationType: VT) {
    super({
      validationType,
      typeValidation: new IsBooleanValidation<T, VT>(validationType),
      opts: undefined,
      args: undefined,
      factories: undefined,
    })
  }
}
