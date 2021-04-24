import { Schema } from '@/schemas'
import type { SchemaType } from '@/schemas/protocols'
import type { IDoValidation } from '@/validations/protocols'
import {
  BooleanValidator,
  NumberValidator,
  ObjectValidator,
  StringValidator,
} from '@/validators/models'

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
  it('should return IsObjectValidationError', () => {
    const { sut } = makeSut({}, 'required', new ObjectValidator('required'))
    expect((sut.validate(false) as Error).name).toBe('IsObjectValidationError')
  })

  it('should return InvalidValidationError', () => {
    const { sut } = makeSut(
      { foo: 'i do not do validate' },
      'required',
      new ObjectValidator('required'),
    )
    expect((sut.validate({}) as Error).name).toBe('InvalidValidationError')
  })

  it('should return InvalidPayloadError', () => {
    const { sut } = makeSut(
      'i do not do validate',
      'required',
      new StringValidator('required'),
    )
    expect((sut.validate('foo') as Error).name).toBe('InvalidPayloadError')
  })

  it('should return nested schema validation error', () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('required'),
        bar: new Schema(
          {
            foo: new BooleanValidator('required'),
            bar: new Schema(
              {
                foobar: new StringValidator('required'),
              },
              'required',
              new ObjectValidator('required'),
            ),
          },
          'required',
          new ObjectValidator('required'),
        ),
      },
      'required',
      new ObjectValidator('required'),
    )
    expect(
      (sut.validate({
        foo: 1,
        bar: {
          foo: true,
          bar: {
            foobar: 0,
          },
        },
      }) as Error).name,
    ).toBe('IsStringValidationError')
  })

  it('should return undefined', () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('required'),
        bar: new Schema(
          {
            foo: new BooleanValidator('required'),
            bar: new Schema(
              {
                foobar: new StringValidator('required'),
              },
              'required',
              new ObjectValidator('required'),
            ),
          },
          'required',
          new ObjectValidator('required'),
        ),
      },
      'required',
      new ObjectValidator('required'),
    )
    expect(
      sut.validate({
        foo: 1,
        bar: {
          foo: true,
          bar: {
            foobar: 'foobar',
          },
        },
      }),
    ).toBeUndefined()
  })
})
