import { IsStringValidation } from '@/validations/models'

//#region Factories

interface Sut {
  sut: IsStringValidation<string, 'required'>
}

const makeSut = (): Sut => {
  const sut = new IsStringValidation('required')
  return {
    sut,
  }
}

//#endregion Factories

describe('IsStringValidation', () => {
  it('should return error if no value', () => {
    const { sut } = makeSut()
    expect(sut.validate()).resolves.toBeTruthy()
  })

  it('should return error if undefined', () => {
    const { sut } = makeSut()
    expect(sut.validate(undefined)).resolves.toBeTruthy()
  })

  it('should return error if null', () => {
    const { sut } = makeSut()
    expect(sut.validate(null)).resolves.toBeTruthy()
  })

  it('should return error if boolean', () => {
    const { sut } = makeSut()
    expect(sut.validate(false)).resolves.toBeTruthy()
  })

  it('should return error if object', () => {
    const { sut } = makeSut()
    expect(sut.validate({})).resolves.toBeTruthy()
  })

  it('should return error if number', () => {
    const { sut } = makeSut()
    expect(sut.validate(0)).resolves.toBeTruthy()
  })

  it('should return error if function', () => {
    const { sut } = makeSut()
    expect(sut.validate(() => new Error())).resolves.toBeTruthy()
  })

  it('should return error if symbol', () => {
    const { sut } = makeSut()
    expect(sut.validate(Symbol())).resolves.toBeTruthy()
  })

  it('should return undefined if empty', () => {
    const { sut } = makeSut()
    expect(sut.validate('')).resolves.toBeUndefined()
  })

  it('should return undefined if valid', () => {
    const { sut } = makeSut()
    expect(sut.validate('valid')).resolves.toBeUndefined()
  })
})
