import { faker } from '@faker-js/faker'
import { MissingParamError } from '../../../src/presentation/error'
import { InvalidTokenError } from '../../../src/presentation/error/token-invalid-error'
import { AuthMiddleware } from '../../../src/presentation/middlewares/auth-middleware'
import { ValidateTokenSpy } from './mocks/load-account-by-token-mock'

const makeSut = () => {
  const loadAccountByToken = new ValidateTokenSpy()
  const sut = new AuthMiddleware(loadAccountByToken)
  return { sut, loadAccountByToken }
}

describe('Validate Token', () => {
  test('Should call load account by id with correct params', async () => {
    const { sut, loadAccountByToken } = makeSut()
    const loadAccountSpy = jest.spyOn(loadAccountByToken, 'loadAccountByToken')
    const authorization = faker.datatype.uuid()
    await sut.handle({ authorization })

    expect(loadAccountSpy).toBeCalledWith(authorization)
  })
  test('Should return 403 when no token is provided', async () => {
    const { sut } = makeSut()

    const res = await sut.handle({ })

    expect(res.statusCode).toBe(403)
    expect(res.body).toEqual(new MissingParamError('authorization'))
  })
  test('Should return 403 when token is invalid or expired', async () => {
    const { sut, loadAccountByToken } = makeSut()
    jest.spyOn(loadAccountByToken, 'loadAccountByToken').mockImplementationOnce(() => {
      return new Promise(resolve => resolve(null))
    })
    const authorization = faker.datatype.uuid()
    const res = await sut.handle({ authorization })
    expect(res.statusCode).toBe(403)
    expect(res.body).toEqual(new InvalidTokenError())
  })
  test('Should return 500 if load account throws', async () => {
    const { sut, loadAccountByToken } = makeSut()
    jest.spyOn(loadAccountByToken, 'loadAccountByToken').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const authorization = faker.datatype.uuid()
    const res = await sut.handle({ authorization })
    expect(res.statusCode).toBe(500)
  })
})
