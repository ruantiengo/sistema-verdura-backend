import { SignUpController } from '../../../src/presentation/controllers/login/signup-controller'
import { MissingParamError } from '../../../src/presentation/error'
import { EmailAlreadyInUse } from '../../../src/presentation/error/email-already-in-use-error'
import { PasswordConfirmationError } from '../../../src/presentation/error/PasswordsDifferentsError'
import { AddAccountSpy } from '../mocks/add-account-mock'
import { fakeAddAccount } from '../mocks/fake-add-account'

const makeSut = () => {
  const addAccount = new AddAccountSpy()
  const sut = new SignUpController(addAccount)
  return { sut, addAccount }
}

describe('SignUpController', () => {
  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const account = {
      email: fakeAddAccount.email,
      password: fakeAddAccount.password,
      passwordConfirmation: fakeAddAccount.passwordConfirmation
    }

    const res = await sut.handle({ body: account })
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('name'))
  })
  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const account = {
      name: fakeAddAccount.name,
      password: fakeAddAccount.password,
      passwordConfirmation: fakeAddAccount.passwordConfirmation
    }
    const res = await sut.handle({ body: account })
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('email'))
  })
  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const account = {
      name: fakeAddAccount.name,
      email: fakeAddAccount.email,
      passwordConfirmation: fakeAddAccount.passwordConfirmation
    }

    const res = await sut.handle({ body: account })
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('password'))
  })
  it('should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const account = {
      name: fakeAddAccount.name,
      password: fakeAddAccount.password,
      email: fakeAddAccount.email
    }

    const res = await sut.handle({ body: account })
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
  it('should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const account = {
      name: fakeAddAccount.name,
      password: fakeAddAccount.password,
      passwordConfirmation: '123',
      email: fakeAddAccount.email
    }

    const res = await sut.handle({ body: account })
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new PasswordConfirmationError())
  })
  it('should call addAccount with correct params', async () => {
    const { sut, addAccount } = makeSut()
    const addSpy = jest.spyOn(addAccount, 'add')
    const account = {
      name: fakeAddAccount.name,
      password: fakeAddAccount.password,
      passwordConfirmation: fakeAddAccount.password,
      email: fakeAddAccount.email
    }

    await sut.handle({ body: account })
    const account2 = {
      name: fakeAddAccount.name,
      password: fakeAddAccount.password,

      email: fakeAddAccount.email
    }
    expect(addSpy).toBeCalledWith(account2)
  })
  it('should return 500 if add account throws', async () => {
    const { sut, addAccount } = makeSut()
    jest.spyOn(addAccount, 'add').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const account = {
      name: fakeAddAccount.name,
      password: fakeAddAccount.password,
      passwordConfirmation: fakeAddAccount.password,
      email: fakeAddAccount.email
    }

    const res = await sut.handle({ body: account })

    expect(res.statusCode).toBe(500)
  })
  it('should return 400 if email already in use', async () => {
    const { sut, addAccount } = makeSut()
    jest.spyOn(addAccount, 'add').mockImplementationOnce(() => {
      return new Promise((resolve) => resolve(false))
    })
    const account = {
      name: fakeAddAccount.name,
      password: fakeAddAccount.password,
      passwordConfirmation: fakeAddAccount.password,
      email: fakeAddAccount.email
    }

    const res = await sut.handle({ body: account })

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual(new EmailAlreadyInUse())
  })
  it('should return 200', async () => {
    const { sut } = makeSut()

    const account = {
      name: fakeAddAccount.name,
      password: fakeAddAccount.password,
      passwordConfirmation: fakeAddAccount.password,
      email: fakeAddAccount.email
    }

    const res = await sut.handle({ body: account })

    expect(res.statusCode).toBe(200)
  })
})
