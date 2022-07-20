import { SignUp } from '../../types/sign-up'
import { Account } from '../entities/account'

export interface AddAccount {
    add(addAccountParams: Omit<SignUp.Params, 'passwordConfirmation'>): Promise<Account>
}
