import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Login } from '../../types'
import { badRequest } from '../helpers/status-code'
import { MissingParamError } from '../error'
import { Authentication } from '../../domain/usecases/authentication'

export class LoginController implements Controller<Login.Params> {
  constructor (private readonly authentication: Authentication) {
    this.authentication = authentication
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (request.body[field] === undefined) return new Promise((resolve, reject) => resolve(badRequest(new MissingParamError(field))))
      }
      const accessToken = await this.authentication.auth(request.body)
      return new Promise(resolve => resolve({ statusCode: 200, body: accessToken }))
    } catch (error) {
      console.log('error')
      return new Promise(resolve => resolve({ statusCode: 500 }))
    }
  }
}
