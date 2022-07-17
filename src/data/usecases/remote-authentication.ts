import { Authentication } from '../../domain/usecases/authentication'
import { Auth } from '../../types/auth'
import { DbLoadAccountByEmail } from '../protocols/db-load-account-by-email'
import { Encrypter } from '../protocols/encrypter'
import { HashComparer } from '../protocols/hash-comparer'

export class RemoteAuthentication implements Authentication {
  constructor (private readonly dbLoadAccountByEmail: DbLoadAccountByEmail,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter) {
    this.dbLoadAccountByEmail = dbLoadAccountByEmail
    this.hashComparer = hashComparer
    this.encrypter = encrypter
  }

  async auth (authParams: Auth.Params): Promise<Auth.Result> {
    const account = await this.dbLoadAccountByEmail.load(authParams.email)
    if (account !== null) {
      const passwordMatch = await this.hashComparer.compare(account.password, authParams.password)
      if (passwordMatch) {
        const accessToken = await this.encrypter.encrypt(account.id, 20)
        return new Promise(resolve => resolve({ accessToken }))
      } else return null
    }
    return null
  }
}
