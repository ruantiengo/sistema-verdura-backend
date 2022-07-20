import { RemoteAuthentication } from '../../../data/usecases/remote-authentication'
import { BCryptAdapter } from '../../../infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter'
import { AccountPrisma } from '../../../infra/database/prisma-postgres/account-prisma'

export const authenticationFactory = (): RemoteAuthentication => {
  const dbLoadAccessToken = new AccountPrisma()
  const hasherCompare = new JwtAdapter()
  const encrypter = new BCryptAdapter()
  const authentication = new RemoteAuthentication(dbLoadAccessToken, encrypter, hasherCompare, dbLoadAccessToken)
  return authentication
}
