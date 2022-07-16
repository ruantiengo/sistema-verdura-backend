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
})
