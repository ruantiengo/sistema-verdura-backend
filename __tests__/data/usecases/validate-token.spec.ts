import { DbValidateToken } from '../../../src/data/usecases/db-validate-token'
import { EncrypterSpy, fakeAccount } from '../mocks'
import { DbloadAccountByIdSpy } from '../mocks/db-load-account-by-id'

const makeSut = () => {
  const decrypter = new EncrypterSpy()
  const loadAccount = new DbloadAccountByIdSpy()
  const sut = new DbValidateToken(decrypter, loadAccount)
  return { sut, decrypter, loadAccount }
}

describe('Db validate token', () => {
  it('should return an account if token is valid', async () => {
    const { sut } = makeSut()
    const account = await sut.loadAccountByToken('token')
    expect(account).toEqual(fakeAccount)
  })
  it('should call decrypter with correct values', async () => {
    const { sut, decrypter } = makeSut()
    const decrypterSpy = jest.spyOn(decrypter, 'decrypt')
    await sut.loadAccountByToken('token')
    expect(decrypterSpy).toBeCalledWith('token')
  })
  it('should return null if decrypter return null', async () => {
    const { sut, decrypter } = makeSut()
    jest.spyOn(decrypter, 'decrypt').mockReturnValue(null)
    const res = await sut.loadAccountByToken('token')
    expect(res).toBeNull()
  })
  it('should return null if loadAccount return null', async () => {
    const { sut, loadAccount } = makeSut()
    jest.spyOn(loadAccount, 'loadAccountById').mockImplementationOnce(() => {
      return new Promise(resolve => resolve(null))
    })
    const res = await sut.loadAccountByToken('token')
    expect(res).toBeNull()
  })
  it('should call loadAccount with correct params', async () => {
    const { sut, loadAccount } = makeSut()
    const loadSpy = jest.spyOn(loadAccount, 'loadAccountById')
    await sut.loadAccountByToken('token')
    expect(loadSpy).toBeCalledWith('password')
  })
  it('should throw if loadAccount throws', async () => {
    const { sut, loadAccount } = makeSut()
    jest.spyOn(loadAccount, 'loadAccountById').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const promise = sut.loadAccountByToken('token')
    expect(promise).rejects.toThrow()
  })
})
