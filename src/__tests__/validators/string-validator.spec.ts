import { requiredString } from '@/validators/factories'

describe('StringValidator', () => {
  it('should return undefined', async () => {
    await expect(requiredString().validate('valid')).resolves.toBeUndefined()
  })

  it('should return error', async () => {
    await expect(
      requiredString({
        caseSensitive: true,
        mustBe: ['Invalid'],
      }).validate('invalid'),
    ).resolves.toBeTruthy()
  })
})
