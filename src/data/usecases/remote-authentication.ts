import { Authentication } from '../../domain/usecases/authentication'
import { Auth } from '../../types/auth'
import { DbLoadAccountByEmail } from '../protocols/db-load-account-by-email'

export class RemoteAuthentication implements Authentication {
  constructor (private readonly dbLoadAccountByEmail: DbLoadAccountByEmail) {
    this.dbLoadAccountByEmail = dbLoadAccountByEmail
  }

  async auth (authParams: Auth.Params): Promise<Auth.Result> {
    const account = await this.dbLoadAccountByEmail.load(authParams.email)
    if (account !== null) {
      console.log('123')
      return new Promise(resolve => resolve({ accessToken: '1234' }))
    }
    return null
  }
}
