export interface Encrypter{
    encrypt(argument: string): Promise<string>
}
