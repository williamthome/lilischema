import { StringMustNotBeValidation } from '@/validations/models'
import { StringMatchOptions } from '@/validations/protocols'

//#region Factories

interface Sut {
  sut: StringMustNotBeValidation<string, 'required'>
}

const makeSut = (
  mustBeIncludedIn: string[],
  opts: StringMatchOptions = {},
): Sut => {
  const sut = new StringMustNotBeValidation('required', mustBeIncludedIn, opts)
  return {
    sut,
  }
}

//#endregion Factories

describe('StringMustNotBeValidation', () => {
  it('should return IsStringIncludedInValidationError', async () => {
    const { sut } = makeSut(['Foo'])
    await expect(sut.validate('foo')).resolves.toMatchObject({
      name: 'StringMustNotBeValidationError',
    })
  })

  it('should return undefined by case sensitive', async () => {
    const { sut } = makeSut(['Foo'], { caseSensitive: true })
    await expect(sut.validate('foo')).resolves.toBeUndefined()
  })

  it('should return undefined', async () => {
    const { sut } = makeSut(['foo', 'bar'])
    await expect(sut.validate('foobar')).resolves.toBeUndefined()
  })
})
