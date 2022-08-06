import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Login } from '../../../types'
import { badRequest, ok } from '../../helpers/status-code'
import { MissingParamError } from '../../error'
import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidFieldError } from '../../error/invalid-field-error'

export class LoginController implements Controller<Login.Params> {
  constructor (private readonly authentication: Authentication) {
    this.authentication = authentication
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (request.body[field] === undefined) return badRequest(new MissingParamError(field))
      }
      const answer = await this.authentication.auth(request.body)

      if (answer === null || answer?.accessToken === null || answer?.refreshToken === null) return badRequest(new InvalidFieldError())

      return ok(answer)
    } catch (error) {
      return new Promise(resolve => resolve({ statusCode: 500 }))
    }
  }
}
