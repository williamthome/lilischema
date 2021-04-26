/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ObjectValidator } from '../models'

export const requiredObject = <T>() =>
  new ObjectValidator<T, 'required'>('required')

export const optionalObject = <T>() =>
  new ObjectValidator<T, 'optional'>('optional')

export const privateObject = <T>() =>
  new ObjectValidator<T, 'private'>('private')

export const readonlyObject = <T>() =>
  new ObjectValidator<T, 'readonly'>('readonly')
