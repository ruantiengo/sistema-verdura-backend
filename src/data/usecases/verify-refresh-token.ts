import { VerifyRefreshToken } from '../../domain/usecases/refresh-token-verify'
import { Encrypter } from '../protocols/cryptography/encrypter'
import { LoadRefreshToken } from '../protocols/database/load-refresht-token'

export class DbVerifyRefreshToken implements VerifyRefreshToken {
  constructor (private readonly loadRefreshToken: LoadRefreshToken,
    private readonly generateRefreshToken: Encrypter) {
    this.generateRefreshToken = generateRefreshToken
    this.loadRefreshToken = loadRefreshToken
  }

  async verify (refreshToken: string): Promise<string | null> {
    const getRefreshToken = await this.loadRefreshToken.load(refreshToken)
    if (getRefreshToken === null) return null
    const accessToken = this.generateRefreshToken.encrypt(getRefreshToken.userId, 30)
    return accessToken
  }
}
