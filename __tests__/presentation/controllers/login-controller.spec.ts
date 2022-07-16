import { LoginController } from '../../../src/presentation/controllers/login-controller'
import { faker } from '@faker-js/faker'
import { MissingParamError } from '../../../src/presentation/error'
import { AuthenticationSpy } from '../mocks/authentication-mock'

const makeSut = () => {
  const authentication = new AuthenticationSpy()
  const sut = new LoginController(authentication)
  return { sut }
}

describe('Login Controller', () => {
  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({
      body: {

        password: faker.internet.password()
      }
    })
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('email'))
  })
  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({
      body: {
        email: faker.internet.email()
      }
    })
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('password'))
  })
  it('should return 200 if no errors appers', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({
      body: {
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    })
    expect(res.statusCode).toBe(200)
    const result = {
      accessToken: 'test'
    }

    expect(res.body).toEqual(result)
  })
})
