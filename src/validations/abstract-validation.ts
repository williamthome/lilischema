import type { IDoValidation, ValidateFunction } from '@/validations/protocols'

export abstract class AbstractValidation<T> implements IDoValidation<T> {
  readonly wrapping!: T
  abstract validate: ValidateFunction
}
