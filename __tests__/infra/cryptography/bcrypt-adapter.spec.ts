import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { BCryptAdapter } from '../../../src/infra/cryptography/bcrypt-adapter'

const makeSut = () => {
  const sut = new BCryptAdapter()
  return { sut }
}

jest.mock('bcrypt', () => ({
  async compare (): Promise<boolean> {
    return true
  }
}))

describe('Bcrypt Adapter', () => {
  it('should call hash comparer with correct params', async () => {
    const { sut } = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    const password = faker.internet.password()
    const hashedPassword = faker.internet.password()
    await sut.compare(hashedPassword, password)
    expect(compareSpy).toBeCalledWith(password, hashedPassword)
  })
  it('should return false if strings not match', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      return new Promise(resolve => resolve(false))
    })
    const res = await sut.compare(faker.internet.password(), faker.internet.password())
    expect(res).toBeFalsy()
  })
  it('should return true if strings match', async () => {
    const { sut } = makeSut()

    const res = await sut.compare(faker.internet.password(), faker.internet.password())
    expect(res).toBeTruthy()
  })
  it('should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const promise = sut.compare(faker.internet.password(), faker.internet.password())
    expect(promise).rejects.toThrow()
  })
})
