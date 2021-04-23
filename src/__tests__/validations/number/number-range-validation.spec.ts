import { NumberRangeValidation } from '@/validations/models'

//#region Factories

interface Sut {
  sut: NumberRangeValidation
}

const makeSut = (range: { min?: number; max?: number }): Sut => {
  const sut = new NumberRangeValidation(range)
  return {
    sut,
  }
}

//#endregion Factories

describe('NumberRangeValidation', () => {
  it('should return error if undefined', () => {
    const { sut } = makeSut({})
    expect(sut.validate()).toBeTruthy()
  })

  it('should return error if NaN', () => {
    const { sut } = makeSut({})
    expect(sut.validate('NaN')).toBeTruthy()
  })

  it('should return error if below min', () => {
    const { sut } = makeSut({ min: 1 })
    expect(sut.validate(0)).toBeTruthy()
  })

  it('should return error if above max', () => {
    const { sut } = makeSut({ max: 0 })
    expect(sut.validate(1)).toBeTruthy()
  })

  it('should return error if not between min and max', () => {
    const { sut } = makeSut({ min: 0, max: 1 })
    expect(sut.validate(-1)).toBeTruthy()
  })

  it('should return undefined if above min', () => {
    const { sut } = makeSut({ min: 0 })
    expect(sut.validate(1)).toBeUndefined()
  })

  it('should return undefined if below max', () => {
    const { sut } = makeSut({ max: 1 })
    expect(sut.validate(0)).toBeUndefined()
  })

  it('should return undefined if between min and max', () => {
    const { sut } = makeSut({ min: 0, max: 2 })
    expect(sut.validate(1)).toBeUndefined()
  })

  it('should return undefined if equals min', () => {
    const { sut } = makeSut({ min: 0 })
    expect(sut.validate(0)).toBeUndefined()
  })

  it('should return undefined if equals max', () => {
    const { sut } = makeSut({ max: 0 })
    expect(sut.validate(0)).toBeUndefined()
  })

  it('should return undefined if equals min and max is defined', () => {
    const { sut } = makeSut({ min: 0, max: 1 })
    expect(sut.validate(0)).toBeUndefined()
  })

  it('should return undefined if equals max and min is defined', () => {
    const { sut } = makeSut({ min: 0, max: 1 })
    expect(sut.validate(1)).toBeUndefined()
  })
})
