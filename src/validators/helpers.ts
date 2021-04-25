import { isDoValidation } from '@/validations'
import type { Validation, ValidationType } from '@/validations/protocols'

export function isValidation<T, VT extends ValidationType>(
  obj: unknown,
): obj is Validation<T, VT> {
  return (
    isDoValidation(obj) &&
    (obj as Validation<T, VT>)?.validationType !== undefined
  )
}
