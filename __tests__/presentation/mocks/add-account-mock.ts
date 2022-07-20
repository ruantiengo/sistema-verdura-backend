
import { Account } from '../../../src/domain/entities/account'
import { AddAccount } from '../../../src/domain/usecases/add-account'
import { SignUp } from '../../../src/types/sign-up'
import { fakeAccount } from '../../data/mocks'

export class AddAccountSpy implements AddAccount {
  add (addAccountParams: Omit<SignUp.Params, 'passwordConfirmation'>): Promise<Account> {
    return new Promise(resolve => resolve(fakeAccount))
  }
}
