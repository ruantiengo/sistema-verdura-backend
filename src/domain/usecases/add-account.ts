import { SignUp } from '../../types/sign-up'

export interface AddAccount {
    add(addAccountParams: Omit<SignUp.Params, 'passwordConfirmation'>): Promise<boolean>
}
