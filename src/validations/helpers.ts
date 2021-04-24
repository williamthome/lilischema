import type { IDoValidation } from './protocols'

export function doValidate<T>(obj: unknown): obj is IDoValidation<T> {
  return typeof (obj as IDoValidation<T>)?.validate === 'function'
}
