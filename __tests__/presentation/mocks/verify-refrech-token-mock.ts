import { VerifyRefreshToken } from '../../../src/domain/usecases/refresh-token-verify'
import { fakeAccount } from '../../data/mocks'

export class VerifyRefreshTokenSpy implements VerifyRefreshToken {
  verify (refreshToken: string): Promise<string | null> {
    return new Promise(resolve => resolve(fakeAccount?.id!))
  }
}
