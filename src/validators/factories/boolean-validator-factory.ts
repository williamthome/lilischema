/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BooleanValidator } from '../models'

export const requiredBoolean = <T extends boolean>() =>
  new BooleanValidator<T, 'required'>('required')

export const optionalBoolean = <T extends boolean>() =>
  new BooleanValidator<T, 'optional'>('optional')

export const privateBoolean = <T extends boolean>() =>
  new BooleanValidator<T, 'private'>('private')

export const readonlyBoolean = <T extends boolean>() =>
  new BooleanValidator<T, 'readonly'>('readonly')
