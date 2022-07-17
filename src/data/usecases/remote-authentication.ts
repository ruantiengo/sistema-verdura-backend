import { Authentication } from '../../domain/usecases/authentication'
import { Auth } from '../../types/auth'
import { DbLoadAccountByEmail } from '../protocols/database/db-load-account-by-email'
import { Encrypter } from '../protocols/cryptography/encrypter'
import { HashComparer } from '../protocols/cryptography/hash-comparer'
import { GenerateRefreshToken } from '../protocols/database/generate-refresh-token'

export class RemoteAuthentication implements Authentication {
  constructor (private readonly dbLoadAccountByEmail: DbLoadAccountByEmail,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly generateRefreshToken: GenerateRefreshToken) {
    this.dbLoadAccountByEmail = dbLoadAccountByEmail
    this.hashComparer = hashComparer
    this.encrypter = encrypter
    this.generateRefreshToken = generateRefreshToken
  }

  async auth (authParams: Auth.Params): Promise<Auth.Result> {
    const account = await this.dbLoadAccountByEmail.loadByEmail(authParams.email)
    if (account !== null) {
      const passwordMatch = await this.hashComparer.compare(account.password, authParams.password)
      if (passwordMatch) {
        const accessToken = this.encrypter.encrypt(account.id, 20)
        const refreshToken = await this.generateRefreshToken.generateRefreshToken(account.id)
        return new Promise(resolve => resolve({ accessToken, refreshToken }))
      } else return null
    }
    return null
  }
}
