import { RefreshTokenModel } from '../../../domain/entities/refresh-token'

export interface LoadRefreshToken{
    load(refreshToken: string): Promise<RefreshTokenModel>
}
