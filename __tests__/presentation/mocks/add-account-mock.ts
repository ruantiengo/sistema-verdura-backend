
import { AddAccount } from '../../../src/domain/usecases/add-account'
import { SignUp } from '../../../src/types/sign-up'

export class AddAccountSpy implements AddAccount {
  add (addAccountParams: Omit<SignUp.Params, 'passwordConfirmation'>): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}
