import { RefreshTokenModel } from '../domain/entities/refresh-token'

export namespace Auth{
    export type Params = {
        email: string
        password: string
    }
    export type Result = null | {
        accessToken: string
        refreshToken: RefreshTokenModel
    }
}
