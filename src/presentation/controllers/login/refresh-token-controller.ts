
import { VerifyRefreshToken } from '../../../domain/usecases/refresh-token-verify'
import { RefreshTokenN } from '../../../types/refresh-token'
import { MissingParamError } from '../../error'
import { InvalidTokenError } from '../../error/token-invalid-error'
import { badRequest, ok } from '../../helpers/status-code'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class RefreshTokenController implements Controller<RefreshTokenN.Params> {
  constructor (private readonly verifyRefreshToken: VerifyRefreshToken) {
    this.verifyRefreshToken = verifyRefreshToken
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const refreshToken = request.body.refreshToken
      if (!refreshToken) return badRequest(new MissingParamError('refreshToken'))
      const newAccessToken = await this.verifyRefreshToken.verify(request.body.refreshToken)
      if (!newAccessToken) {
        return badRequest(new InvalidTokenError())
      }
      return ok({ newAccessToken })
    } catch (error) {
      return { statusCode: 500 }
    }
  }
}
