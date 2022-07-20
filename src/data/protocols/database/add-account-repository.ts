import { Account } from '../../../domain/entities/account'
import { SignUp } from '../../../types/sign-up'

export interface AddAccountRepository{
    add(addAccountParams:Omit<SignUp.Params, 'passwordConfirmation'>): Promise<Account>
}
