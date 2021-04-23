export type ValidateResponse = void | Error

export type ValidatePayload = unknown | undefined

export type ValidateFunction = (
  toValidate?: ValidatePayload,
) => ValidateResponse
