import { Account } from '../../domain/entities/account'
import { ValidateToken } from '../../domain/usecases/authenticate-token'
import { Decrypter } from '../protocols/cryptography/decrypter'
import { LoadAccountById } from '../protocols/database/load-account-by-token-repo'

export class DbValidateToken implements ValidateToken {
  constructor (private readonly decrypter: Decrypter, private readonly loadAccountById: LoadAccountById) {
    this.decrypter = decrypter
    this.loadAccountById = loadAccountById
  }

  async loadAccountByToken (accessToken: string): Promise<Account> {
    const userId = this.decrypter.decrypt(accessToken)

    if (!userId) return null
    const account = await this.loadAccountById.loadAccountById(userId)
    return account
  }
}
