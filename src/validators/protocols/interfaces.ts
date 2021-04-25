import type {
  IDoValidation,
  IValidable,
  ValidationType,
} from '@/validations/protocols'

export interface IValidator<T, VT extends ValidationType>
  extends IDoValidation<T>,
    IValidable<VT> {
  readonly validations: IDoValidation<T>[]
}
