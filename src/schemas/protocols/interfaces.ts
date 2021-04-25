import type {
  IDoValidation,
  IValidable,
  ValidationType,
} from '@/validations/protocols'

export interface ISchema<T, VT extends ValidationType>
  extends IDoValidation<T>,
    IValidable<VT> {
  readonly schemas: T
}
