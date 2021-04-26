import { requiredObject } from '@/validators/factories'

describe('ObjectValidator', () => {
  it('should return undefined', async () => {
    await expect(requiredObject().validate({})).resolves.toBeUndefined()
  })

  it('should return error', async () => {
    await expect(requiredObject().validate('invalid')).resolves.toBeTruthy()
  })
})
