import { faker } from '@faker-js/faker'
import { RemoteAuthentication } from '../../../src/data/usecases/remote-authentication'
import { DbLoadAccountByEmailSpy } from '../mocks/db-load-account-mock'

const makeSut = () => {
  const dbLoadAccountByEmail = new DbLoadAccountByEmailSpy()
  const sut = new RemoteAuthentication(dbLoadAccountByEmail)
  return { sut, dbLoadAccountByEmail }
}

describe('Remote authentication', () => {
  it('should ensure if db load account by email is called with correct param', async () => {
    const { sut, dbLoadAccountByEmail } = makeSut()
    const loadAccountSpy = jest.spyOn(dbLoadAccountByEmail, 'load')
    const email = faker.internet.email()
    await sut.auth({ email, password: faker.internet.password() })
    expect(loadAccountSpy).toBeCalledWith(email)
  })
  it('should throw if db load account throws', async () => {
    const { sut, dbLoadAccountByEmail } = makeSut()
    jest.spyOn(dbLoadAccountByEmail, 'load').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const email = faker.internet.email()
    const promise = sut.auth({ email, password: faker.internet.password() })
    expect(promise).rejects.toThrow()
  })
  it('should return null if no account is provided', async () => {
    const { sut, dbLoadAccountByEmail } = makeSut()
    jest.spyOn(dbLoadAccountByEmail, 'load').mockImplementationOnce(() => {
      return new Promise((resolve) => resolve(null))
    })
    const email = faker.internet.email()
    const res = await sut.auth({ email, password: faker.internet.password() })
    expect(res).toBe(null)
  })
})
