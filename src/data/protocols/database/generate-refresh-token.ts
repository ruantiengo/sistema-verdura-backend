import { RefreshToken } from '@prisma/client'

export interface GenerateRefreshToken{
    generateRefreshToken(userId: string): Promise<RefreshToken>
}
