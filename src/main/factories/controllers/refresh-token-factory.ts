import { DbVerifyRefreshToken } from '../../../data/usecases/verify-refresh-token'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter'
import { AccountPrisma } from '../../../infra/database/prisma-postgres/account-prisma'
import { RefreshTokenController } from '../../../presentation/controllers/login/refresh-token-controller'

export const refreshTokenControllerFactory = () => {
  const loadToken = new AccountPrisma()
  const generateToken = new JwtAdapter()
  const verifyRefreshTokenUseCase = new DbVerifyRefreshToken(loadToken, generateToken)
  const controller = new RefreshTokenController(verifyRefreshTokenUseCase)
  return controller
}
