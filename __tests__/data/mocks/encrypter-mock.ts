import { Encrypter } from '../../../src/data/protocols/cryptography/encrypter'

export class EncrypterSpy implements Encrypter {
  encrypt (argument: string, timeToExpire: number): string {
    return 'hashed-password'
  }
}
