import { StringMustBeValidation } from '@/validations/models'
import { StringMatchOptions } from '@/validations/protocols'

//#region Factories

interface Sut {
  sut: StringMustBeValidation<string, 'required'>
}

const makeSut = (
  mustBeIncludedIn: string[],
  opts: StringMatchOptions = {},
): Sut => {
  const sut = new StringMustBeValidation('required', mustBeIncludedIn, opts)
  return {
    sut,
  }
}

//#endregion Factories

describe('StringMustBeValidation', () => {
  it('should return IsStringIncludedInValidationError', async () => {
    const { sut } = makeSut(['foo'])
    await expect(sut.validate('bar')).resolves.toMatchObject({
      name: 'StringMustBeValidationError',
    })
  })

  it('should return IsStringIncludedInValidationError by case sensitive', async () => {
    const { sut } = makeSut(['Foo'], { caseSensitive: true })
    await expect(sut.validate('foo')).resolves.toMatchObject({
      name: 'StringMustBeValidationError',
    })
  })

  it('should return undefined', async () => {
    const { sut } = makeSut(['foo', 'bar'])
    await expect(sut.validate('foo')).resolves.toBeUndefined()
  })
})
