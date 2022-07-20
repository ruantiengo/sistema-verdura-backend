import { ValidateToken } from '../../domain/usecases/authenticate-token'
import { MissingParamError } from '../error'
import { InvalidTokenError } from '../error/token-invalid-error'
import { forbbiden, ok, serverError } from '../helpers/status-code'
import { HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: ValidateToken) {
    this.loadAccountByToken = loadAccountByToken
  }

  async handle ({ authorization }: any): Promise<HttpResponse> {
    try {
      if (authorization === undefined) return forbbiden(new MissingParamError('authorization'))

      const account = await this.loadAccountByToken.loadAccountByToken(authorization)

      if (account === null) return forbbiden(new InvalidTokenError())
      return ok({ account })
    } catch (error) {
      return serverError()
    }
  }
}
