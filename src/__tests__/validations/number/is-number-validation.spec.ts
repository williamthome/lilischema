import { IsNumberValidation } from '@/validations/models'

//#region Factories

interface Sut {
  sut: IsNumberValidation<number, 'required'>
}

const makeSut = (): Sut => {
  const sut = new IsNumberValidation('required')
  return {
    sut,
  }
}

//#endregion Factories

describe('IsNumberValidation', () => {
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

  it('should return error if string', () => {
    const { sut } = makeSut()
    expect(sut.validate('invalid')).toBeTruthy()
  })

  it('should return error if object', () => {
    const { sut } = makeSut()
    expect(sut.validate({})).toBeTruthy()
  })

  it('should return error if function', () => {
    const { sut } = makeSut()
    expect(sut.validate(() => new Error())).toBeTruthy()
  })

  it('should return error if symbol', () => {
    const { sut } = makeSut()
    expect(sut.validate(Symbol())).toBeTruthy()
  })

  it('should return undefined if valid', () => {
    const { sut } = makeSut()
    expect(sut.validate(1)).toBeUndefined()
  })
})
