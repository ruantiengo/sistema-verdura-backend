import { SignUp } from '../../../types/sign-up'

export interface AddAccountRepository{
    add(addAccountParams:Omit<SignUp.Params, 'passwordConfirmation'>): Promise<boolean>
}
