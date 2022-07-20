
import { AddAccount } from '../../domain/usecases/add-account'
import { SignUp } from '../../types/sign-up'
import { MissingParamError } from '../error'
import { PasswordConfirmationError } from '../error/PasswordsDifferentsError'
import { badRequest, ok, serverError } from '../helpers/status-code'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller<SignUp.Params> {
  constructor (private readonly addAccount: AddAccount) {
    this.addAccount = addAccount
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { email, password, passwordConfirmation, name }: SignUp.Params = request.body
    const requiredFields = ['email', 'password', 'passwordConfirmation', 'name']
    try {
      for (const field of requiredFields) {
        if (!request.body[field]) return badRequest(new MissingParamError(field))
      }
      if (password !== passwordConfirmation) return badRequest(new PasswordConfirmationError())
      const account = await this.addAccount.add({ email, password, name })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
