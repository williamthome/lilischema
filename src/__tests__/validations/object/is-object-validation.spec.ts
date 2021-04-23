import { IsObjectValidation } from '@/validations/models'

//#region Factories

interface Sut {
  sut: IsObjectValidation
}

const makeSut = (): Sut => {
  const sut = new IsObjectValidation()
  return {
    sut,
  }
}

//#endregion Factories

describe('IsObjectValidation', () => {
  it('should return error if undefined', () => {
    const { sut } = makeSut()
    expect(sut.validate()).toBeTruthy()
  })

  it('should return undefined if empty', () => {
    const { sut } = makeSut()
    expect(sut.validate({})).toBeUndefined()
  })

  it('should return undefined if valid', () => {
    const { sut } = makeSut()
    expect(sut.validate({ foo: 'bar' })).toBeUndefined()
  })
})
