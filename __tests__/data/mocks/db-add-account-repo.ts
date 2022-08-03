import { AddAccountRepository } from '../../../src/data/protocols/database/add-account-repository'
import { Account } from '../../../src/domain/entities/account'
import { SignUp } from '../../../src/types/sign-up'
import { fakeAccount } from './fake-account-mock'

export class DbAddAccountRepoSpy implements AddAccountRepository {
  add (addAccountParams: Omit<SignUp.Params, 'passwordConfirmation'>): Promise<Account> {
    return new Promise(resolve => resolve(fakeAccount))
  }
}
