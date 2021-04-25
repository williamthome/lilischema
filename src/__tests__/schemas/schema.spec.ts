import type { IDoValidation, ValidationType } from '@/validations/protocols'
import {
  BooleanValidator,
  NumberValidator,
  StringValidator,
} from '@/validators/models'
import type { ExtractSchema } from '@/schemas/protocols'
import { Schema } from '@/schemas'
import { IsStringValidation } from '@/validations/models'

//#region Factories

interface Sut<T, VT extends ValidationType> {
  sut: Schema<T, VT>
}

const makeSut = <T, VT extends ValidationType>(
  schemas: T,
  validationType: VT,
  schemaValidation?: IDoValidation<T>,
): Sut<T, VT> => {
  const sut = new Schema(schemas, validationType, schemaValidation)
  return {
    sut,
  }
}

//#endregion Factories

describe('Schema', () => {
  it('should return IsObjectValidationError', async () => {
    const { sut } = makeSut({}, 'required')
    const error = await sut.validate(false)
    expect(error ? error.name : undefined).toBe('IsObjectValidationError')
  })

  it('should return InvalidValidationError', async () => {
    const { sut } = makeSut({ foo: 'i do not do validate' }, 'required')
    const error = await sut.validate({ foo: '' })
    expect(error ? error.name : undefined).toBe('InvalidValidationError')
  })

  it('should return InvalidPayloadError', async () => {
    const { sut } = makeSut(
      'i do not do validate',
      'required',
      new IsStringValidation('required'),
    )
    const error = await sut.validate('foo')
    expect(error ? error.name : undefined).toBe('InvalidPayloadError')
  })

  it('should return nested schema validation error', async () => {
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
            ),
          },
          'required',
        ),
      },
      'required',
    )
    const error = await sut.validate({
      foo: 1,
      bar: {
        xfoo: true,
        xbar: {
          foobar: 0,
        },
      },
    })
    expect(error ? error.name : undefined).toBe('IsStringValidationError')
  })

  it('should return undefined', async () => {
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
            ),
          },
          'required',
        ),
      },
      'required',
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

    const error = await sut.validate(foo)
    expect(error).toBeUndefined()
  })

  it('should return InvalidPayloadError', async () => {
    const { sut } = makeSut(
      { foo: new StringValidator('required') },
      'required',
    )
    const error = await sut.validate({ bar: 'invalid key' })
    expect(error ? error.name : undefined).toBe('InvalidSchemaError')
  })

  it('should return undefined if partial', async () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('required'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    const error = await sut.validate(
      { foo: 1 },
      {
        isPartialValidation: true,
      },
    )
    expect(error).toBeUndefined()
  })

  it('should return PrivatePropertyError', async () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('private'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    const error = await sut.validate({ foo: 1 })
    expect(error ? error.name : undefined).toBe('PrivatePropertyError')
  })

  it('should return ReadonlyPropertyError', async () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('readonly'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    const error = await sut.validate(
      { foo: 1 },
      {
        isPartialValidation: true,
      },
    )
    expect(error ? error.name : undefined).toBe('ReadonlyPropertyError')
  })

  it('should return RequiredPropertyError', async () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('required'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    const error = await sut.validate({ foo: 1 })
    expect(error ? error.name : undefined).toBe('RequiredPropertyError')
  })
})
