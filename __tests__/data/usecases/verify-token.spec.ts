import { faker } from '@faker-js/faker'
import { DbVerifyRefreshToken } from '../../../src/data/usecases/verify-refresh-token'
import { RefreshTokenModel } from '../../../src/domain/entities/refresh-token'
import { EncrypterSpy, fakeAccount } from '../mocks'
import { LoadRefreshTokenSpy } from '../mocks/db-load-refresh-token'

const makeSut = () => {
  const dbLoadRefreshToken = new LoadRefreshTokenSpy()
  const encrypter = new EncrypterSpy()
  const sut = new DbVerifyRefreshToken(dbLoadRefreshToken, encrypter)
  return { sut, dbLoadRefreshToken, encrypter }
}

describe('Verify Token', () => {
  it('should ensure if db load refresh token is called with correct param', async () => {
    const { sut, dbLoadRefreshToken } = makeSut()
    const loadRefreshTokenSpy = jest.spyOn(dbLoadRefreshToken, 'load')
    const refreshToken: RefreshTokenModel = {
      expiresIn: 30,
      id: faker.datatype.uuid(),
      userId: faker.datatype.uuid()
    }
    await sut.verify(refreshToken.id)
    expect(loadRefreshTokenSpy).toBeCalledWith(refreshToken.id)
  })
  it('should throw if db load refresh token throws', async () => {
    const { sut, dbLoadRefreshToken } = makeSut()
    jest.spyOn(dbLoadRefreshToken, 'load').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const refreshToken: RefreshTokenModel = {
      expiresIn: 30,
      id: faker.datatype.uuid(),
      userId: faker.datatype.uuid()
    }
    const promise = sut.verify(refreshToken.id)
    expect(promise).rejects.toThrow()
  })
  it('should return null if refresh token is invalid', async () => {
    const { sut, dbLoadRefreshToken } = makeSut()
    jest.spyOn(dbLoadRefreshToken, 'load').mockImplementationOnce(() => {
      return new Promise(resolve => resolve(null))
    })
    const refreshToken: RefreshTokenModel = {
      expiresIn: 30,
      id: faker.datatype.uuid(),
      userId: faker.datatype.uuid()
    }
    const res = await sut.verify(refreshToken.id)
    expect(res).toBeNull()
  })
  it('should ensure if db hasher token is called with correct param', async () => {
    const { sut, encrypter } = makeSut()
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')
    const refreshToken: RefreshTokenModel = {
      expiresIn: 30,
      id: faker.datatype.uuid(),
      userId: faker.datatype.uuid()
    }
    await sut.verify(refreshToken.id)
    expect(encryptSpy).toBeCalledWith(fakeAccount?.id, 30)
  })
})
