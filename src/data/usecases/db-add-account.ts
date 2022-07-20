import { Account } from '../../domain/entities/account'
import { AddAccount } from '../../domain/usecases/add-account'
import { SignUp } from '../../types/sign-up'
import { Hasher } from '../protocols/cryptography/hasher'
import { AddAccountRepository } from '../protocols/database/add-account-repository'

export class DbAddAccount implements AddAccount {
  constructor (private readonly addAccountRepo: AddAccountRepository, private readonly hasher: Hasher) {
    this.addAccountRepo = addAccountRepo
    this.hasher = hasher
  }

  async add (addAccountParams:Omit<SignUp.Params, 'passwordConfirmation'>): Promise<Account> {
    const hashedPassword = await this.hasher.hash(addAccountParams.password)
    const addAccount = {
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hashedPassword
    }
    const account = await this.addAccountRepo.add(addAccount)
    return account
  }
}
