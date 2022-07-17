import { RefreshToken } from '@prisma/client'
import { GenerateRefreshToken } from '../../../src/data/protocols/database/generate-refresh-token'
import { refreshTokenMock } from './refresh-token-mock'

export class GenerateRefreshTokenSpy implements GenerateRefreshToken {
  generateRefreshToken (userId: string): Promise<RefreshToken> {
    return new Promise(resolve => resolve(refreshTokenMock))
  }
}
