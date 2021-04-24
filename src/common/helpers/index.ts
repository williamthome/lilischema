export function isIterable(obj: unknown): obj is Record<PropertyKey, unknown> {
  return obj === Object(obj)
}
