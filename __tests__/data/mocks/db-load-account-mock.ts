import { DbLoadAccountByEmail } from '../../../src/data/protocols/database/db-load-account-by-email'
import { Account } from '../../../src/domain/entities/account'
import { fakeAccount } from './fake-account-mock'

export class DbLoadAccountByEmailSpy implements DbLoadAccountByEmail {
  loadByEmail (email: string): Promise<Account> {
    return new Promise(resolve => resolve(fakeAccount))
  }
}
