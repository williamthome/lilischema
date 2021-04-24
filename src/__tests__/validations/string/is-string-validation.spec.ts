import { IsStringValidation } from '@/validations/models'

//#region Factories

interface Sut {
  sut: IsStringValidation
}

const makeSut = (): Sut => {
  const sut = new IsStringValidation()
  return {
    sut,
  }
}

//#endregion Factories

describe('IsStringValidation', () => {
  it('should return error if no value', () => {
    const { sut } = makeSut()
    expect(sut.validate()).toBeTruthy()
  })

  it('should return error if undefined', () => {
    const { sut } = makeSut()
    expect(sut.validate(undefined)).toBeTruthy()
  })

  it('should return error if null', () => {
    const { sut } = makeSut()
    expect(sut.validate(null)).toBeTruthy()
  })

  it('should return error if boolean', () => {
    const { sut } = makeSut()
    expect(sut.validate(false)).toBeTruthy()
  })

  it('should return error if object', () => {
    const { sut } = makeSut()
    expect(sut.validate({})).toBeTruthy()
  })

  it('should return error if number', () => {
    const { sut } = makeSut()
    expect(sut.validate(0)).toBeTruthy()
  })

  it('should return error if function', () => {
    const { sut } = makeSut()
    expect(sut.validate(() => new Error())).toBeTruthy()
  })

  it('should return error if symbol', () => {
    const { sut } = makeSut()
    expect(sut.validate(Symbol())).toBeTruthy()
  })

  it('should return undefined if empty', () => {
    const { sut } = makeSut()
    expect(sut.validate('')).toBeUndefined()
  })

  it('should return undefined if valid', () => {
    const { sut } = makeSut()
    expect(sut.validate('valid')).toBeUndefined()
  })
})
