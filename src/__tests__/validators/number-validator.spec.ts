import { requiredNumber } from '@/validators/factories'

describe('NumberValidator', () => {
  it('should return undefined', async () => {
    await expect(requiredNumber().validate(0)).resolves.toBeUndefined()
  })

  it('should return error', async () => {
    await expect(
      requiredNumber({ range: { min: 0 } }).validate(-1),
    ).resolves.toBeTruthy()
  })
})
