import { isDoValidation } from '@/validations'
import type { ValidationType } from '@/validations/protocols'
import type { IValidator } from './protocols'

export function isValidator<T, VT extends ValidationType>(
  obj: unknown,
): obj is IValidator<T, VT> {
  return (
    isDoValidation(obj) &&
    (obj as IValidator<T, VT>)?.validationType !== undefined
  )
}
