export interface Encrypter{
    encrypt(argument: string, timeToExpire: number): Promise<string>
}
