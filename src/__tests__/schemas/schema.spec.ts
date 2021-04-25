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
  it('should return IsObjectValidationError', () => {
    const { sut } = makeSut({}, 'required')
    expect((sut.validate(false) as Error).name).toBe('IsObjectValidationError')
  })

  it('should return InvalidValidationError', () => {
    const { sut } = makeSut({ foo: 'i do not do validate' }, 'required')
    expect((sut.validate({ foo: '' }) as Error).name).toBe(
      'InvalidValidationError',
    )
  })

  it('should return InvalidPayloadError', () => {
    const { sut } = makeSut(
      'i do not do validate',
      'required',
      new IsStringValidation('required'),
    )
    expect((sut.validate('foo') as Error).name).toBe('InvalidPayloadError')
  })

  it('should return nested schema validation error', () => {
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

    expect(sut.validate(foo)).toBeUndefined()
  })

  it('should return InvalidPayloadError', () => {
    const { sut } = makeSut(
      { foo: new StringValidator('required') },
      'required',
    )
    expect((sut.validate({ bar: 'invalid key' }) as Error).name).toBe(
      'InvalidSchemaError',
    )
  })

  it('should return undefined if partial', () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('required'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    expect(
      sut.validate(
        {
          foo: 1,
        },
        {
          isPartialValidation: true,
        },
      ),
    ).toBeUndefined()
  })

  it('should return PrivatePropertyError', () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('private'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    expect(
      (sut.validate({
        foo: 1,
      }) as Error).name,
    ).toBe('PrivatePropertyError')
  })

  it('should return ReadonlyPropertyError', () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('readonly'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    expect(
      (sut.validate(
        {
          foo: 1,
        },
        {
          isPartialValidation: true,
        },
      ) as Error).name,
    ).toBe('ReadonlyPropertyError')
  })

  it('should return RequiredPropertyError', () => {
    const { sut } = makeSut(
      {
        foo: new NumberValidator('required'),
        bar: new StringValidator('required'),
      },
      'required',
    )
    expect(
      (sut.validate({
        foo: 1,
      }) as Error).name,
    ).toBe('RequiredPropertyError')
  })
})
