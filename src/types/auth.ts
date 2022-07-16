export namespace Auth{
    export type Params = {
        email: string
        password: string
    }
    export type Result = {
        accessToken: string
    }
}
