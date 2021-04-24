import { Schema } from '@/schemas'
import type { SchemaType } from '@/schemas/protocols'
import { IsObjectValidation } from '@/validations/models'
import type { IDoValidation } from '@/validations/protocols'

//#region Factories

interface Sut<T, ST extends SchemaType> {
  sut: Schema<T, ST>
}

const makeSut = <T, ST extends SchemaType>(
  schemas: T,
  schemaType: ST,
  schemaValidation: IDoValidation<T>,
): Sut<T, ST> => {
  const sut = new Schema(schemas, schemaType, schemaValidation)
  return {
    sut,
  }
}

//#endregion Factories

describe('Schema', () => {
  it('should return error if invalid schema', () => {
    const { sut } = makeSut({}, 'required', new IsObjectValidation())
    expect(sut.validate(false)).toBeTruthy()
  })
})
