import { LoadAccountById } from '../../../src/data/protocols/database/load-account-by-token-repo'
import { Account } from '../../../src/domain/entities/account'
import { fakeAccount } from './fake-account-mock'

export class DbloadAccountByIdSpy implements LoadAccountById {
  loadAccountById (userId: string): Promise<Account> {
    return new Promise(resolve => resolve(fakeAccount))
  }
}
