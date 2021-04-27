import {
  ExtractCompleteSchema,
  optionalNumber,
  requiredSchema,
  requiredString,
} from 'lilischema'

const personSchema = () =>
  requiredSchema({
    name: requiredString({
      mustBe: ['william', 'moíse', 'serena'],
    }),
    age: optionalNumber({
      range: {
        min: 18,
        max: 100,
      },
    }),
  })

const william: ExtractCompleteSchema<typeof personSchema> = {
  name: 'William',
  age: 32,
}

const serena: ExtractCompleteSchema<typeof personSchema> = {
  name: 'Serena',
  age: 0
}

Promise.all([
  personSchema().validate(william),
  personSchema().validate(serena),
]).then((result) => {
  result.forEach((r) => console.log(r))
})
