import { Auth } from '../../types/auth'

export interface Authentication{
    auth(authParams: Auth.Params): Promise<Auth.Result>
}
