import type { ISchemable, SchemaType } from '@/schemas/protocols'
import type { IDoValidation } from '@/validations/protocols'

export interface IValidator<T, ST extends SchemaType>
  extends IDoValidation,
    ISchemable<ST> {
  readonly objectType: T
  readonly validations: IDoValidation[]
}
