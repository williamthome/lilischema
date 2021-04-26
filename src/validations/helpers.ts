import type { IDoValidation, IValidable, ValidationType } from './protocols'

export function isDoValidation<T>(obj: unknown): obj is IDoValidation<T> {
  return typeof (obj as IDoValidation<T>)?.validate === 'function'
}

export function isValidable<VT extends ValidationType>(
  obj: unknown,
): obj is IValidable<VT> {
  return (obj as IValidable<VT>)?.validationType !== undefined
}
