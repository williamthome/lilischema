import type { ISchemable, SchemaType } from '@/schemas/protocols'
import type { IDoValidation } from '@/validations/protocols'

export interface IValidator<T, ST extends SchemaType>
  extends IDoValidation<T>,
    ISchemable<ST> {
  readonly validations: IDoValidation<T>[]
}
