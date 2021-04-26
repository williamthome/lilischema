import { requiredBoolean } from '@/validators/factories'

describe('BooleanValidator', () => {
  it('should return undefined', async () => {
    await expect(requiredBoolean().validate(true)).resolves.toBeUndefined()
  })

  it('should return error', async () => {
    await expect(requiredBoolean().validate('invalid')).resolves.toBeTruthy()
  })
})
