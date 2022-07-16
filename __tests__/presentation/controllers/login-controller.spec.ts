import { LoginController } from '../../../src/presentation/controllers/login-controller'
import { faker } from '@faker-js/faker'
import { MissingParamError } from '../../../src/presentation/error'

const makeSut = () => {
  const sut = new LoginController()
  return { sut }
}

describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({
      body: {

        password: faker.internet.password()
      }
    })
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('email'))
  })
  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({
      body: {
        email: faker.internet.email()
      }
    })
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('password'))
  })
})
