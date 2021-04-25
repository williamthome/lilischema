//#region Factories

import { AbstractValidation } from '@/validations'
import type { ValidateResponse, ValidationType } from '@/validations/protocols'

interface SpyOptions<T> {
  throwError?: boolean
  overrideReturn?: T
}

class AbstractValidationSpy<
  T,
  VT extends ValidationType
> extends AbstractValidation<T, VT> {
  constructor(
    validationType: VT,
    public opts: SpyOptions<ValidateResponse> = {},
  ) {
    super(validationType)
  }

  doValidate = async (): Promise<ValidateResponse> => {
    const { throwError, overrideReturn } = this.opts
    if (throwError) throw new Error()
    if (overrideReturn) return overrideReturn
  }
}

interface Sut<T, VT extends ValidationType> {
  sut: AbstractValidationSpy<T, VT>
}

const makeSut = <T, VT extends ValidationType>(
  validationType: VT,
  opts?: SpyOptions<ValidateResponse>,
): Sut<T, VT> => {
  const sut = new AbstractValidationSpy<T, VT>(validationType, opts)
  return {
    sut,
  }
}

//#endregion Factories

describe('AbstractValidation', () => {
  it('should return PrivatePropertyError', async () => {
    const { sut } = makeSut('private')
    await expect(sut.validate()).resolves.toMatchObject({
      name: 'PrivatePropertyError',
    })
  })

  it('should return ReadonlyPropertyError', async () => {
    const { sut } = makeSut('readonly')
    await expect(
      sut.validate('any', { isPartialValidation: true }),
    ).resolves.toMatchObject({
      name: 'ReadonlyPropertyError',
    })
  })

  it('should return undefined if optional', async () => {
    const { sut } = makeSut('optional')
    await expect(sut.validate()).resolves.toBeUndefined()
  })

  it('should return RequiredPropertyError', async () => {
    const { sut } = makeSut('required')
    await expect(sut.validate()).resolves.toMatchObject({
      name: 'RequiredPropertyError',
    })
  })

  it('should throw if doValidate throws', async () => {
    const { sut } = makeSut('required', { throwError: true })
    await expect(sut.validate({})).rejects.toThrowError()
  })
})
