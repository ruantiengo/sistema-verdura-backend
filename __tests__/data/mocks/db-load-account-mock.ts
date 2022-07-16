import { DbLoadAccountByEmail } from '../../../src/data/protocols/db-load-account-by-email'
import { Account } from '../../../src/domain/entities/account'
import { fakeAccount } from './fake-account'

export class DbLoadAccountByEmailSpy implements DbLoadAccountByEmail {
  load (email: string): Promise<Account> {
    return new Promise(resolve => resolve(fakeAccount))
  }
}
