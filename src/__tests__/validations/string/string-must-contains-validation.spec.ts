import type { StringArrayMatchOptions } from '@/validations/protocols'
import { StringMustContainsValidation } from '@/validations/models'

//#region Factories

interface Sut {
  sut: StringMustContainsValidation<string, 'required'>
}

const makeSut = (
  mustContains: string[],
  opts: StringArrayMatchOptions = {},
): Sut => {
  const sut = new StringMustContainsValidation('required', mustContains, opts)
  return {
    sut,
  }
}

//#endregion Factories

describe('StringMustContainsValidation', () => {
  it('should return undefined', async () => {
    const { sut } = makeSut(['foo'])
    await expect(sut.validate('ThisIncludesFoo')).resolves.toBeUndefined()
  })

  it('should return StringMustContainsValidationError by word split', async () => {
    const { sut } = makeSut(['foo'], { splitInWords: true })
    await expect(sut.validate('ThisNotIncludesFooWord')).resolves.toMatchObject(
      {
        name: 'StringMustContainsValidationError',
      },
    )
  })

  it('should return StringMustContainsValidationError', async () => {
    const { sut } = makeSut(['foo', 'bar'])
    await expect(sut.validate('Contains just foo')).resolves.toMatchObject({
      name: 'StringMustContainsValidationError',
    })
  })

  it('should return undefined', async () => {
    const { sut } = makeSut(['FoO', 'bAr'])
    await expect(sut.validate('Contains foo and bar')).resolves.toBeUndefined()
  })

  it('should return StringMustContainsValidationError by case sensitive', async () => {
    const { sut } = makeSut(['Foo', 'bar'], { caseSensitive: true })
    await expect(
      sut.validate('Contains foo and bar but is invalid'),
    ).resolves.toMatchObject({
      name: 'StringMustContainsValidationError',
    })
  })

  it('should return undefined by case sensitive', async () => {
    const { sut } = makeSut(['Foo', 'Bar'], { caseSensitive: true })
    await expect(sut.validate('Contains Foo and Bar')).resolves.toBeUndefined()
  })
})
