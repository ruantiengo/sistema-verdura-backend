import { RefreshTokenModel } from '../../../domain/entities/refresh-token'

export interface LoadRefreshToken{
    loadRefreshToken(refreshToken: string): Promise<RefreshTokenModel>
}
