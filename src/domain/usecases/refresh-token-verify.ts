
export interface VerifyRefreshToken{
    verify(refreshToken: string): Promise<string | null>
}
