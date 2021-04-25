import type { ExtractSchema } from './schemas/protocols'
import { StringValidator } from './validators/models'
import { Schema } from './schemas'

const requiredStringValidator = new StringValidator('required')
const valid = requiredStringValidator.validate('Valid value')
const invalid = requiredStringValidator.validate(123)
console.log('IsStringValidation result:', { valid, invalid })

const fooSchema = new Schema(
  {
    foo: requiredStringValidator,
    bar: new Schema(
      {
        foo: requiredStringValidator,
      },
      'optional',
    ),
  },
  'required',
)

type FooSchemaType = ExtractSchema<typeof fooSchema>
const foo: FooSchemaType = {
  foo: 'bar',
  bar: {
    foo: 'bar',
  },
}
const validSchema = fooSchema.validate(foo)
const invalidSchema = fooSchema.validate()
console.log('SchemaValidation result:', { validSchema, invalidSchema })
