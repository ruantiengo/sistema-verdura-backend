import { Account } from '../../../../src/domain/entities/account'
import { ValidateToken } from '../../../../src/domain/usecases/authenticate-token'
import { fakeAccount } from '../../../data/mocks'

export class ValidateTokenSpy implements ValidateToken {
  loadAccountByToken (accessToken: string): Promise<Account> {
    return new Promise(resolve => resolve(fakeAccount))
  }
}
