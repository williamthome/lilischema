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
  it('should return error if no value', async () => {
    const { sut } = makeSut()
    await expect(sut.validate()).resolves.toBeTruthy()
  })

  it('should return error if undefined', async () => {
    const { sut } = makeSut()
    await expect(sut.validate(undefined)).resolves.toBeTruthy()
  })

  it('should return error if null', async () => {
    const { sut } = makeSut()
    await expect(sut.validate(null)).resolves.toBeTruthy()
  })

  it('should return error if boolean', async () => {
    const { sut } = makeSut()
    await expect(sut.validate(false)).resolves.toBeTruthy()
  })

  it('should return error if string', async () => {
    const { sut } = makeSut()
    await expect(sut.validate('invalid')).resolves.toBeTruthy()
  })

  it('should return error if object', async () => {
    const { sut } = makeSut()
    await expect(sut.validate({})).resolves.toBeTruthy()
  })

  it('should return error if function', async () => {
    const { sut } = makeSut()
    await expect(sut.validate(() => new Error())).resolves.toBeTruthy()
  })

  it('should return error if symbol', async () => {
    const { sut } = makeSut()
    await expect(sut.validate(Symbol())).resolves.toBeTruthy()
  })

  it('should return undefined if valid', async () => {
    const { sut } = makeSut()
    await expect(sut.validate(1)).resolves.toBeUndefined()
  })
})
