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
    await expect(sut.validate('foo')).resolves.toMatchObject({
      name: 'IsNumberValidationError',
    })
  })

  it('should return error if below min', async () => {
    const { sut } = makeSut({ min: 1 })
    await expect(sut.validate(0)).resolves.toMatchObject({
      name: 'MinNumberValidationError',
    })
  })

  it('should return error if above max', async () => {
    const { sut } = makeSut({ max: 0 })
    await expect(sut.validate(1)).resolves.toMatchObject({
      name: 'MaxNumberValidationError',
    })
  })

  it('should return error if not between min and max', async () => {
    const { sut } = makeSut({ min: 0, max: 1 })
    await expect(sut.validate(-1)).resolves.toMatchObject({
      name: 'NumberRangeValidationError',
    })
  })

  it('should return undefined if above min', async () => {
    const { sut } = makeSut({ min: 0 })
    await expect(sut.validate(1)).resolves.toBeUndefined()
  })

  it('should return undefined if below max', async () => {
    const { sut } = makeSut({ max: 1 })
    await expect(sut.validate(0)).resolves.toBeUndefined()
  })

  it('should return undefined if between min and max', async () => {
    const { sut } = makeSut({ min: 0, max: 2 })
    await expect(sut.validate(1)).resolves.toBeUndefined()
  })

  it('should return undefined if equals min', async () => {
    const { sut } = makeSut({ min: 0 })
    await expect(sut.validate(0)).resolves.toBeUndefined()
  })

  it('should return undefined if equals max', async () => {
    const { sut } = makeSut({ max: 0 })
    await expect(sut.validate(0)).resolves.toBeUndefined()
  })

  it('should return undefined if equals min and max is defined', async () => {
    const { sut } = makeSut({ min: 0, max: 1 })
    await expect(sut.validate(0)).resolves.toBeUndefined()
  })

  it('should return undefined if equals max and min is defined', async () => {
    const { sut } = makeSut({ min: 0, max: 1 })
    await expect(sut.validate(1)).resolves.toBeUndefined()
  })
})
