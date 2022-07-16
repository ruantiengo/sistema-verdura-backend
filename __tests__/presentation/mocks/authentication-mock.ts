import { Authentication } from '../../../src/domain/usecases/authentication'
import { Auth } from '../../../src/types/auth'

export class AuthenticationSpy implements Authentication {
  auth (authParams: Auth.Params): Promise<Auth.Result> {
    const result:Auth.Result = {
      accessToken: 'test'
    }

    return new Promise(resolve => resolve(result))
  }
}
