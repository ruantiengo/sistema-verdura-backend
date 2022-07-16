import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Login } from '../../types'
import { badRequest } from '../helpers/status-code'
import { MissingParamError } from '../error'

export class LoginController implements Controller<Login.Params> {
  handle (request: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (request.body[field] === undefined) return new Promise((resolve, reject) => resolve(badRequest(new MissingParamError(field))))
    }
    return new Promise(resolve => resolve({ statusCode: 200 }))
  }
}
