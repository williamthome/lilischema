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
  it('should return error if undefined', () => {
    const { sut } = makeSut()
    expect(sut.validate()).toBeTruthy()
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
