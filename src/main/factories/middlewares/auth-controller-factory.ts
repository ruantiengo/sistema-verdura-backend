import { DbValidateToken } from '../../../data/usecases/db-validate-token'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter'
import { AccountPrisma } from '../../../infra/database/prisma-postgres/account-prisma'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'

export const authMiddlewareFactory = () => {
  const loadAccountByToken = new AccountPrisma()
  const jwt = new JwtAdapter()
  const loadAccount = new DbValidateToken(jwt, loadAccountByToken)
  const controller = new AuthMiddleware(loadAccount)
  return controller
}
