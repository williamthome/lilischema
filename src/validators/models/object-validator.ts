import type { ValidationType } from '@/validations/protocols'
import { IsObjectValidation } from '@/validations/models'
import { ValidatorFactory } from '../validator-factory'

export class ObjectValidator<
  T,
  VT extends ValidationType
> extends ValidatorFactory<T, VT, undefined, undefined> {
  constructor(validationType: VT) {
    super({
      validationType,
      typeValidation: new IsObjectValidation<T, VT>(validationType),
      opts: undefined,
      args: undefined,
      factories: undefined,
    })
  }
}
