import { NumberRangeValidation } from '@/validations/models'

//#region Factories

interface Sut {
  sut: NumberRangeValidation<number, 'required'>
}

const makeSut = (range: { min?: number; max?: number }): Sut => {
  const sut = new NumberRangeValidation('required', range)
  return {
    sut,
  }
}

//#endregion Factories

describe('NumberRangeValidation', () => {
  it('should return error if NaN', async () => {
    const { sut } = makeSut({})
    const error = await sut.validate('foo')
    expect(error ? error.name : undefined).toBe('IsNumberValidationError')
  })

  it('should return error if below min', async () => {
    const { sut } = makeSut({ min: 1 })
    const error = await sut.validate(0)
    expect(error ? error.name : undefined).toBe('MinNumberValidationError')
  })

  it('should return error if above max', async () => {
    const { sut } = makeSut({ max: 0 })
    const error = await sut.validate(1)
    expect(error ? error.name : undefined).toBe('MaxNumberValidationError')
  })

  it('should return error if not between min and max', async () => {
    const { sut } = makeSut({ min: 0, max: 1 })
    const error = await sut.validate(-1)
    expect(error ? error.name : undefined).toBe('NumberRangeValidationError')
  })

  it('should return undefined if above min', () => {
    const { sut } = makeSut({ min: 0 })
    expect(sut.validate(1)).resolves.toBeUndefined()
  })

  it('should return undefined if below max', () => {
    const { sut } = makeSut({ max: 1 })
    expect(sut.validate(0)).resolves.toBeUndefined()
  })

  it('should return undefined if between min and max', () => {
    const { sut } = makeSut({ min: 0, max: 2 })
    expect(sut.validate(1)).resolves.toBeUndefined()
  })

  it('should return undefined if equals min', () => {
    const { sut } = makeSut({ min: 0 })
    expect(sut.validate(0)).resolves.toBeUndefined()
  })

  it('should return undefined if equals max', () => {
    const { sut } = makeSut({ max: 0 })
    expect(sut.validate(0)).resolves.toBeUndefined()
  })

  it('should return undefined if equals min and max is defined', () => {
    const { sut } = makeSut({ min: 0, max: 1 })
    expect(sut.validate(0)).resolves.toBeUndefined()
  })

  it('should return undefined if equals max and min is defined', () => {
    const { sut } = makeSut({ min: 0, max: 1 })
    expect(sut.validate(1)).resolves.toBeUndefined()
  })
})
