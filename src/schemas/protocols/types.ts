/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  IDoValidation,
  IValidable,
  OptionalValidation,
  PrivateValidation,
  ReadonlyValidation,
  RequiredValidation,
} from '@/validations/protocols'
import type { Schema } from '../schema'

type ValidableTypeOrNever<T, Filter> = {
  [P in keyof T]: T[P] extends IValidable<infer VT>
    ? VT extends Filter
      ? T[P]
      : never
    : never
}

type FilteredDoValidationTypes<T, VT> = ExcludeNeverPropertiesOf<
  T extends IDoValidation<infer U> ? ValidableTypeOrNever<U, VT> : never
>

type KeysMatchingValidationType<T, VT> = keyof FilteredDoValidationTypes<T, VT>

type ExcludeKeysWithTypeOf<T, V> = {
  [K in keyof T]: Exclude<T[K], undefined> extends V ? never : K
}[keyof T]

type ExtractWithout<T, V> = Pick<T, ExcludeKeysWithTypeOf<T, V>>

type ExcludeNeverPropertiesOf<T> = T extends Record<PropertyKey, unknown>
  ? { [K in keyof ExtractWithout<T, never>]: ExcludeNeverPropertiesOf<T[K]> }
  : T

type OptionalExceptFor<T, TRequired extends keyof T = keyof T> = Partial<
  Pick<T, Exclude<keyof T, TRequired>>
> &
  Required<Pick<T, TRequired>>

type RequiredExceptFor<T, TOptional extends keyof T = keyof T> = Required<
  Pick<T, Exclude<keyof T, TOptional>>
> &
  Partial<Pick<T, TOptional>>

type ReadonlyExceptFor<T, TReadonly extends keyof T = keyof T> = Readonly<
  Pick<T, TReadonly> & Pick<T, Exclude<keyof T, TReadonly>>
>

type OvewriteToRequired<T, VT> = OptionalExceptFor<
  FilteredDoValidationTypes<T, VT>,
  KeysMatchingValidationType<T, VT>
>

type OvewriteToOptional<T, VT> = RequiredExceptFor<
  FilteredDoValidationTypes<T, VT>,
  KeysMatchingValidationType<T, VT>
>

type OvewriteToReadonly<T, VT> = ReadonlyExceptFor<
  FilteredDoValidationTypes<T, VT>,
  KeysMatchingValidationType<T, VT>
>

type OvewriteSchema<
  T,
  RequiredType,
  OptionalType,
  ReadonlyType
> = OvewriteToRequired<T, RequiredType> &
  OvewriteToOptional<T, OptionalType> &
  OvewriteToReadonly<T, ReadonlyType>

type ExtractDoValidationType<T> = T extends Schema<infer U, any>
  ? {
      [P in keyof U]: ExtractDoValidationType<U[P]>
    }
  : T extends IDoValidation<infer VT>
  ? VT
  : never

type OvewritedSchema<T, RequiredType, OptionalType, ReadonlyType> = {
  [P in keyof OvewriteSchema<
    T,
    RequiredType,
    OptionalType,
    ReadonlyType
  >]: OvewriteSchema<T, RequiredType, OptionalType, ReadonlyType>[P] extends
    | Schema<any, any>
    | undefined
    ? OvewritedSchema<
        OvewriteSchema<T, RequiredType, OptionalType, ReadonlyType>[P],
        RequiredType,
        OptionalType,
        ReadonlyType
      >
    : ExtractDoValidationType<
        OvewriteSchema<T, RequiredType, OptionalType, ReadonlyType>[P]
      >
}

type Unboxed<T> = T extends (...args: any[]) => unknown
  ? Unboxed<ReturnType<T>>
  : T

export type ExtractCompleteSchema<T> = OvewritedSchema<
  Unboxed<T>,
  RequiredValidation | PrivateValidation,
  OptionalValidation,
  ReadonlyValidation
>

export type ExtractSchemaForCreation<T> = OvewritedSchema<
  Unboxed<T>,
  RequiredValidation,
  OptionalValidation,
  ReadonlyValidation
>

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<DeepPartial<R>>
    : DeepPartial<T[K]>
}

export type ExtractSchemaForModify<T> = DeepPartial<ExtractSchemaForCreation<T>>
