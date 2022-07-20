import { RefreshTokenController } from '../../../src/presentation/controllers/refresh-token-controller'
import { fakeAccount } from '../../data/mocks'
import { VerifyRefreshTokenSpy } from '../mocks/verify-refrech-token-mock'

const makeSut = () => {
  const verifyRefreshToken = new VerifyRefreshTokenSpy()
  const sut = new RefreshTokenController(verifyRefreshToken)
  return { sut, verifyRefreshToken }
}

describe('Refresh Token Controller', () => {
  it('should return 400 if no refresh token is provided', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({
      body: {

      }
    })
    expect(res.statusCode).toBe(400)
  })
  it('should return 500 if no verifyRefreshToken throws', async () => {
    const { sut, verifyRefreshToken } = makeSut()
    jest.spyOn(verifyRefreshToken, 'verify').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const res = await sut.handle({
      body: {
        refreshToken: '123'
      }
    })
    expect(res.statusCode).toBe(500)
  })
  it('should return 200 if verify token success', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({
      body: {
        refreshToken: '123'
      }
    })
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ newAccessToken: fakeAccount?.id })
  })
})
