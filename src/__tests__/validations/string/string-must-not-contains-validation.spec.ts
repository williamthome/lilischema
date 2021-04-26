import type { StringArrayMatchOptions } from '@/validations/protocols'
import { StringMustNotContainsValidation } from '@/validations/models'

//#region Factories

interface Sut {
  sut: StringMustNotContainsValidation<string, 'required'>
}

const makeSut = (
  mustNotContains: string[],
  opts: StringArrayMatchOptions = {},
): Sut => {
  const sut = new StringMustNotContainsValidation(
    'required',
    mustNotContains,
    opts,
  )
  return {
    sut,
  }
}

//#endregion Factories

describe('StringMustNotContainsValidation', () => {
  it('should return StringMustNotContainsValidationError', async () => {
    const { sut } = makeSut(['foo'])
    await expect(sut.validate('ThisIncludesFoo')).resolves.toMatchObject({
      name: 'StringMustNotContainsValidationError',
    })
  })

  it('should return undefined by word split', async () => {
    const { sut } = makeSut(['foo'], { splitInWords: true })
    await expect(
      sut.validate('ThisNotIncludesFooWord'),
    ).resolves.toBeUndefined()
  })

  it('should return StringMustNotContainsValidationError', async () => {
    const { sut } = makeSut(['foo', 'bar'])
    await expect(sut.validate('Contains foo')).resolves.toMatchObject({
      name: 'StringMustNotContainsValidationError',
    })
  })

  it('should return undefined by case sensitive', async () => {
    const { sut } = makeSut(['FoO', 'bAr'], { caseSensitive: true })
    await expect(sut.validate('Contains foo and bar')).resolves.toBeUndefined()
  })

  it('should return StringMustNotContainsValidationError by case sensitive', async () => {
    const { sut } = makeSut(['Foo', 'Bar'], { caseSensitive: true })
    await expect(sut.validate('Contains Foo and Bar')).resolves.toMatchObject({
      name: 'StringMustNotContainsValidationError',
    })
  })
})
