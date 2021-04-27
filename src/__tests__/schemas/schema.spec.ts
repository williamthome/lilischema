import type { IDoValidation, ValidationType } from '@/validations/protocols'
import {
  BooleanValidator,
  NumberValidator,
  StringValidator,
} from '@/validators/models'
import type {
  ExtractCompleteSchema,
  ExtractSchemaForCreation,
} from '@/schemas/protocols'
import { optionalSchema, requiredSchema, Schema } from '@/schemas'
import { IsStringValidation } from '@/validations/models'
import {
  optionalBoolean,
  optionalNumber,
  privateBoolean,
} from '@/validators/factories'

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
    await expect(sut.validate(false)).resolves.toMatchObject({
      name: 'IsObjectValidationError',
    })
  })

  it('should return InvalidValidationError', async () => {
    const { sut } = makeSut({ foo: 'i do not do validate' }, 'required')
    await expect(sut.validate({ foo: '' })).resolves.toMatchObject({
      name: 'InvalidValidationError',
    })
  })

  it('should return InvalidPayloadError', async () => {
    const { sut } = makeSut(
      'i do not do validate',
      'required',
      new IsStringValidation('required'),
    )
    await expect(sut.validate('foo')).resolves.toMatchObject({
      name: 'InvalidPayloadError',
    })
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
    await expect(
      sut.validate({
        foo: 1,
        bar: {
          xfoo: true,
          xbar: {
            foobar: 0,
          },
        },
      }),
    ).resolves.toMatchObject({
      name: 'IsStringValidationError',
    })
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

    const foo: ExtractCompleteSchema<typeof sut> = {
      foo: 1,
      bar: {
        xfoo: true,
        xbar: {
          foobar: 'foobar',
        },
      },
    }

    await expect(sut.validate(foo)).resolves.toBeUndefined()
  })

  it('should return InvalidPayloadError', async () => {
    const { sut } = makeSut(
      { foo: new StringValidator('required') },
      'required',
    )
    await expect(sut.validate({ bar: 'invalid key' })).resolves.toMatchObject({
      name: 'InvalidSchemaError',
    })
  })

  it('should return undefined if partial', async () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('required'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    await expect(
      sut.validate(
        { foo: 1 },
        {
          isPartialValidation: true,
        },
      ),
    ).resolves.toBeUndefined()
  })

  it('should return PrivatePropertyError', async () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('private'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    await expect(sut.validate({ foo: 0 })).resolves.toMatchObject({
      name: 'PrivatePropertyError',
    })
  })

  it('should return ReadonlyPropertyError', async () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('readonly'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    await expect(
      sut.validate(
        { foo: 1 },
        {
          isPartialValidation: true,
        },
      ),
    ).resolves.toMatchObject({
      name: 'ReadonlyPropertyError',
    })
  })

  it('should return RequiredPropertyError', async () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('required'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    await expect(sut.validate({ foo: 1 })).resolves.toMatchObject({
      name: 'RequiredPropertyError',
    })
  })

  it('should return undefined using function schema', async () => {
    const schema = () =>
      requiredSchema({
        foo: optionalNumber(),
        bar: optionalSchema({
          xfoo: privateBoolean(),
          xbar: requiredSchema({
            yfoo: optionalBoolean(),
            ybar: requiredSchema({
              xfoobar: optionalNumber(),
            }),
          }),
        }),
      })

    type Foo = ExtractSchemaForCreation<typeof schema>

    const foo: Foo = {
      foo: 1,
      bar: {
        xbar: {
          ybar: {
            xfoobar: undefined,
          },
        },
      },
    }

    await expect(schema().validate(foo)).resolves.toBeUndefined()
  })

  it('should return undefined using multiples validations types', async () => {
    const schema = () =>
      requiredSchema({
        foo: optionalNumber(),
        bar: optionalSchema({
          xfoo: privateBoolean(),
          xbar: requiredSchema({
            yfoo: optionalBoolean(),
            ybar: requiredSchema({
              xfoobar: optionalNumber(),
            }),
          }),
        }),
      })

    type Foo = ExtractSchemaForCreation<typeof schema>

    const foo: Foo = {
      bar: {
        xbar: {
          ybar: {
            xfoobar: undefined,
          },
        },
      },
    }

    await expect(schema().validate(foo)).resolves.toBeUndefined()
  })
})
