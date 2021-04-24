import type { ExtractSchema, SchemaType } from '@/schemas/protocols'
import { Schema } from '@/schemas'
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
    expect((sut.validate({ foo: '' }) as Error).name).toBe(
      'InvalidValidationError',
    )
  })

  it('should return InvalidPayloadError', () => {
    const { sut } = makeSut(
      'i do not do validate',
      'required',
      new StringValidator('required'),
    )
    expect((sut.validate('foo') as Error).name).toBe('InvalidPayloadError')
  })

  fit('should return nested schema validation error', () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('required'),
        bar: new Schema(
          {
            xfoo: new BooleanValidator('required'),
            xbar: new Schema(
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
          xfoo: true,
          xbar: {
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
            xfoo: new BooleanValidator('required'),
            xbar: new Schema(
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

    const foo: ExtractSchema<typeof sut> = {
      foo: 1,
      bar: {
        xfoo: true,
        xbar: {
          foobar: 'foobar',
        },
      },
    }

    expect(sut.validate(foo)).toBeUndefined()
  })

  it('should return InvalidPayloadError', () => {
    const { sut } = makeSut(
      { foo: new StringValidator('required') },
      'required',
      new ObjectValidator('required'),
    )
    expect((sut.validate({ bar: 'invalid key' }) as Error).name).toBe(
      'InvalidSchemaError',
    )
  })
})
