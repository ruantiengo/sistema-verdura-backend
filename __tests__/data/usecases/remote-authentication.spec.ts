import { faker } from '@faker-js/faker'
import { RemoteAuthentication } from '../../../src/data/usecases/remote-authentication'
import { DbLoadAccountByEmailSpy, EncrypterSpy, fakeAccount, GenerateRefreshTokenSpy, HashComparerSpy } from '../mocks'

const makeSut = () => {
  const dbLoadAccountByEmail = new DbLoadAccountByEmailSpy()
  const hashComparer = new HashComparerSpy()
  const encrypter = new EncrypterSpy()
  const generateRefreshToken = new GenerateRefreshTokenSpy()
  const sut = new RemoteAuthentication(dbLoadAccountByEmail, hashComparer, encrypter, generateRefreshToken)
  return { sut, dbLoadAccountByEmail, hashComparer, encrypter, generateRefreshToken }
}

describe('Remote authentication', () => {
  it('should ensure if db load account by email is called with correct param', async () => {
    const { sut, dbLoadAccountByEmail } = makeSut()
    const loadAccountSpy = jest.spyOn(dbLoadAccountByEmail, 'loadByEmail')
    const email = faker.internet.email()
    await sut.auth({ email, password: faker.internet.password() })
    expect(loadAccountSpy).toBeCalledWith(email)
  })
  it('should throw if db load account throws', async () => {
    const { sut, dbLoadAccountByEmail } = makeSut()
    jest.spyOn(dbLoadAccountByEmail, 'loadByEmail').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const email = faker.internet.email()
    const promise = sut.auth({ email, password: faker.internet.password() })
    expect(promise).rejects.toThrow()
  })
  it('should return null if no account is provided', async () => {
    const { sut, dbLoadAccountByEmail } = makeSut()
    jest.spyOn(dbLoadAccountByEmail, 'loadByEmail').mockImplementationOnce(() => {
      return new Promise((resolve) => resolve(null))
    })
    const email = faker.internet.email()
    const res = await sut.auth({ email, password: faker.internet.password() })
    expect(res).toBe(null)
  })
  it('should ensure if hashComparer is called with correct param', async () => {
    const { sut, hashComparer } = makeSut()
    const hashComparerSpy = jest.spyOn(hashComparer, 'compare')
    const email = faker.internet.email()
    const password = faker.internet.password()
    await sut.auth({ email, password })
    expect(hashComparerSpy).toBeCalledWith(fakeAccount?.password, password)
  })
  it('should throw if hasher compare throws', async () => {
    const { sut, hashComparer } = makeSut()
    jest.spyOn(hashComparer, 'compare').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const email = faker.internet.email()
    const promise = sut.auth({ email, password: faker.internet.password() })
    expect(promise).rejects.toThrow()
  })
  it('should return null if password is invalid', async () => {
    const { sut, hashComparer } = makeSut()
    jest.spyOn(hashComparer, 'compare').mockImplementationOnce(() => {
      return new Promise((resolve) => resolve(false))
    })
    const email = faker.internet.email()
    const res = await sut.auth({ email, password: faker.internet.password() })
    expect(res).toBe(null)
  })
  it('should ensure if generate refresh token is called with correct param', async () => {
    const { sut, generateRefreshToken } = makeSut()
    const genRefreshTokenSpy = jest.spyOn(generateRefreshToken, 'generateRefreshToken')
    const email = faker.internet.email()
    await sut.auth({ email, password: faker.internet.password() })
    expect(genRefreshTokenSpy).toBeCalledWith(fakeAccount?.id)
  })
  it('should throw if generate refresh token throws', async () => {
    const { sut, generateRefreshToken } = makeSut()
    jest.spyOn(generateRefreshToken, 'generateRefreshToken')
      .mockImplementationOnce(() => {
        return new Promise((resolve, reject) => reject(new Error()))
      })
    const email = faker.internet.email()
    const promise = sut.auth({ email, password: faker.internet.password() })
    expect(promise).rejects.toThrow()
  })
  it('should ensure if db hasher token is called with correct param', async () => {
    const { sut, encrypter } = makeSut()
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')
    const email = faker.internet.email()
    await sut.auth({ email, password: faker.internet.password() })

    expect(encryptSpy).toBeCalledWith(fakeAccount?.id, 20)
  })
})
