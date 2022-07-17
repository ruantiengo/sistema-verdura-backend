export interface Encrypter{
    encrypt(argument: string, timeToExpire: number): string
}
