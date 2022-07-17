import { Authentication } from '../../../src/domain/usecases/authentication'
import { Auth } from '../../../src/types/auth'
import { refreshTokenMock } from '../../data/mocks/refresh-token-mock'

export class AuthenticationSpy implements Authentication {
  auth (authParams: Auth.Params): Promise<Auth.Result> {
    const result:Auth.Result = {
      accessToken: 'test',
      refreshToken: refreshTokenMock
    }

    return new Promise(resolve => resolve(result))
  }
}
