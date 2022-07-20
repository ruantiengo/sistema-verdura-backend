import { faker } from '@faker-js/faker'
import { JwtAdapter } from '../../../src/infra/cryptography/jwt-adapter'
import jwt from 'jsonwebtoken'

const makeSut = () => {
  const sut = new JwtAdapter()
  return { sut }
}

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'hashed-password'
  },
  verify (): string {
    return 'password'
  }
}))

describe('Bcrypt Adapter', () => {
  it('should call sign with correct params', async () => {
    const { sut } = makeSut()
    const jwtSpy = jest.spyOn(jwt, 'sign')
    const id = faker.datatype.uuid()
    sut.encrypt(id, 30)

    expect(jwtSpy).toBeCalledWith({ id }, process.env.JWT_SECRET!, { expiresIn: 30 })
  })
  it('should reutrn hashed-password when called', async () => {
    const { sut } = makeSut()
    jest.spyOn(jwt, 'sign')
    const id = faker.datatype.uuid()
    const res = sut.encrypt(id, 30)

    expect(res).toBe('hashed-password')
  })
})
