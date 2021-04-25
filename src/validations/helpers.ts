import type { IDoValidation } from './protocols'

export function isDoValidation<T>(obj: unknown): obj is IDoValidation<T> {
  return typeof (obj as IDoValidation<T>)?.validate === 'function'
}
